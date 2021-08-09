const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  io.emit('user connected', 'User');
  console.log('User connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    io.emit('user disconnected', 'User');
    console.log('User disconnected');
  });  
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
