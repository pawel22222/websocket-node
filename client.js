const io = require('socket.io-client');
const server = io.connect('http://localhost:4000');

server.emit('send_hello', {
  clientName: 'client1.html',
  message: 'hello2',
  // socketID: server.id,
});

// const rasaServer = io.connect('http://localhost:5002');

// rasaServer.emit('user_uttered', {
//   type: 'CHAT',
//   content: JSON.stringify('dane'),
//   sender: '321',
// });
