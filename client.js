var socket = io();
 
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

var username = prompt("What's your username?");
if (username== null) {
  username = "Anon"
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
  var item = document.createElement('li');
  item.textContent = user + " : " + msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('output-messages', function(data) {
  console.log(data) 
});


