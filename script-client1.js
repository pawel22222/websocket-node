import connect from 'socket.io-client';
const socket = connect('http://localhost:4000');

socket.emit('send_hello', {
  clientName: 'client1.html',
  message: 'hello2',
  socketID: socket.id,
});
