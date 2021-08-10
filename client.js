var socket = io();
 
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

function appendMsg(user, msg) {
  var item = document.createElement('li');
  item.textContent = user + " : " + msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}


var username = prompt("What's your username?");
if (username == null) {
  username = "Anon";
}

socket.emit('connect status', username, "connected");

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', username, input.value);
    input.value = '';
  }
});

socket.on('connect status', function(user, status) {
  var item = document.createElement('li');
  item.textContent = user + " " + status;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});


socket.on('chat message', function(user, msg) {
  appendMsg(user, msg);
});

socket.on('output-messages', function(data) {
  console.log(data);
  if (data.length) {
    data.forEach(message => {
      appendMsg(message.user, message.msg);
    });
  }
});


