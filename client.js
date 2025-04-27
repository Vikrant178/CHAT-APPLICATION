const socket = io('http://localhost:5000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const append = (message, position) => {
    const messageElement = document.createElement('div');  
    messageElement.innerText = message;
    messageElement.classList.add('message', position);
    messageContainer.append(messageElement);
};

// Show a prompt asking for the user's name
const name = prompt("Enter your name to join");  
console.log("Sending new-user-joined event for:", name); // Debugging
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    console.log("Received user-joined event for:", name); // Debugging
    append(`${name} joined the chat`, 'right'); 
});
