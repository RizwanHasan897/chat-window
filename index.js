const chatWindow = document.querySelector('.chat-window');
const messageContainer = document.querySelector('.message-container');
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-button');
const openChatButton = document.querySelector('.open-chat-button');

const config = {
    backgroundColor: '#6D6E71',
    messageBackgroundColor: '#676E6E',
    textColor: '#000',
    friendTextColor: '#3C61D3',
};

function configureChatComponent(configuration) {
    const chatWindowStyle = chatWindow.style;
    chatWindowStyle.backgroundColor = configuration.backgroundColor;

    const messageStyle = messageContainer.style;
    messageStyle.backgroundColor = configuration.messageBackgroundColor;

    const messageInputStyle = messageInput.style;
    messageInputStyle.color = configuration.textColor;

    const sendButtonStyle = sendButton.style;
    sendButtonStyle.backgroundColor = configuration.friendTextColor;
}

configureChatComponent(config);

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');

    if (sender === 'Friend') {
        messageElement.style.backgroundColor = '#007bff';
        messageElement.style.color = '#fff';
    } else {
        messageElement.style.backgroundColor = '#ccc';
    }

    messageElement.textContent = `${sender}: ${message}`;
    messageContainer.appendChild(messageElement);
}


async function fetchRandomMessage() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex].title;
    } catch (error) {
        console.error('Error fetching random message:', error);
    }
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function toggleChatBox() {
    chatWindow.classList.toggle('open');
    sendButton.classList.toggle('open');
    messageInput.classList.toggle('open');
}

openChatButton.addEventListener('click', () => {
    toggleChatBox();
});

sendButton.addEventListener('click', async () => {
    const userMessage = messageInput.value;
    if (userMessage.trim() !== '') {
        addMessage('You', userMessage);
        messageInput.value = '';

        await delay(1000);
        const randomMessage = await fetchRandomMessage();
        addMessage('Friend', randomMessage);
    }
});

addMessage('Friend', 'Hello');
