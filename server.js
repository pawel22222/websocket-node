const express = require('express')
const app = express()
const server = require('http').createServer(app)
const WebSocket = require('ws')

const wss = new WebSocket.Server({ server: server })

let messages = []


wss.on('connection', function connection(ws) {
    console.log('\nA new client conected!')
    console.log(`Total clints: ${wss.clients.size}`)

    ws.send(JSON.stringify(messages))

    ws.on('message', function incoming(message) {
        messages.push(JSON.parse(message))

        const scs = [...wss.clients].filter(el => el !== ws)

        scs[0].send(JSON.stringify(messages))
    })
})


app.get('/', (req, res) => res.send('Hello world'))

server.listen(3000, () => console.log('Listning on port: 3000'))
