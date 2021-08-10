const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const mongoose = require('mongoose');
const Msg = require('./models/messages');
const mongoDB = 'mongodb+srv://dbTpl:theSkrt518@cluster0.3xcg6.mongodb.net/message-database?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true,
                            useUnifiedTopology: true }).then(() => {
  console.log("connected to mongodb");
}).catch(err => console.log(err));


app.use(express.static('.'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  var username;
  Msg.find().then(result => {
    socket.emit('output-messages', result)
  });

  socket.on('connect status', (user, status) => {
    username = user
    console.log(user + " " + status);
    io.emit('connect status', user, status);
  });

  socket.on('disconnect', () => {
    console.log(username + " disconnected");
    io.emit('connect status', username, "disconncted");
  });

  socket.on('message', (user, msg) => {
    const message = new Msg({msg, user})
    message.save().then(()=>{
      console.log(user + " : " + msg);
      io.emit('message', user, msg);
    });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
