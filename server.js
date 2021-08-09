const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('.'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  var username;
  socket.on('connect status', (user, status) => {
    username = user
    console.log(user + " " + status);
    io.emit('connect status', user, status);
  });
  socket.on('chat message', (user, msg) => {
    console.log(user + " : " + msg);
    io.emit('chat message', user, msg);
  });
  socket.on('disconnect', () => {
    console.log(username + " disconnected");
    io.emit('connect status', username, "disconncted");
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
