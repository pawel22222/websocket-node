const session = require('express-session');
const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
    credentials: true,
  },
  //allowEIO3: true,
});

io.use((socket, next) => {
  console.log('Server-Client Connected!');
  //console.log(socket);
  next();
});

io.on('connection', (socket) => {
  socket.onAny((event, args) => {
    console.log(event, args);
  });

  socket.on('session_request', (content) => {
    console.log('socketId', socket.id);
    console.log('response content', content);
    const test = {
      session_id: '12345',
    };
    socket.emit('session_confirm', test);
  });

  socket.on('user_uttered', (userRequest) => {
    // console.log('user_uttered');
    // console.log(userRequest);
    let message = userRequest.message;
    const botUttered = {
      text: 'Odpowiadam: ' + message,
      socket_id: userRequest.socket_id,
    };
    socket.emit('bot_uttered', botUttered);
  });

  socket.on('send_hello', ({ clientName, message /* socketID */ }) => {
    console.log(`${clientName}: ${message}`);
    // console.log(`ID: ${socketID}`);
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});

// ----------------------------------------------------------

// const express = require('express')
// const app = express()
// const server = require('http').createServer(app)
// const WebSocket = require('ws')

// const wss = new WebSocket.Server({ server: server })
// let messages = []

// wss.on('connection', function connection(ws) {
//     console.log('\nA new client conected!')
//     console.log(`Total clints: ${wss.clients.size}`)

//     // ws.send(JSON.stringify(messages))

//     ws.on('message', function incoming(message) {
//         messages.push(JSON.parse(message))

//         const scs = [...wss.clients].filter(el => el !== ws)

//         scs[0].send(JSON.stringify(messages))
//     })
// })

// app.get('/', (req, res) => res.send('Hello world'))
// server.listen(3000, () => console.log('Listning on port: 3000'))
