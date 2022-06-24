require('dotenv').config();
const express = require('express');
const socket = require('socket.io');

const PORT = process.env.PORT || 5001;

//App
const app = express();
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
});

//Static files
app.use(express.static('public'));

//Socket
const io = socket(server);

io.on('connection', (socket) => {
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});
