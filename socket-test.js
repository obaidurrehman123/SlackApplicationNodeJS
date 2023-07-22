const io = require('socket.io-client');

// Set up the Socket.io client connection to your server
const socket = io('http://localhost:6090');

// Listen for the 'connect' event to know when the connection is established
socket.on('connect', () => {
    console.log('Connected to Socket.io server');

    socket.emit('add-user', '451a1999-d0bd-4931-8af5-cd11055b783c');
    console.log("added user");
    socket.emit('send-msg', { to: '451a1999-d0bd-4931-8af5-cd11055b783c', msg: 'testing you' });
    console.log("message sent from here");
});


// Listen for the 'disconnect' event to know when the connection is closed
socket.on('disconnect', () => {
    console.log('Disconnected from Socket.io server');
});


