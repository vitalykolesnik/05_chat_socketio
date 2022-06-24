const socket = io();

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const feedback = document.getElementById('feedback');
const output = document.getElementById('output');
const btn = document.getElementById('send');

btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
    });
});

socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});
