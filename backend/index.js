const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')

const port = process.env.PORT || 1111
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

const { addUser } = require('./users')

let users = []

io.on('connection', socket => {
  console.log('connection', socket.id)

  socket.on('join', ({ name, room }, callback) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()


    if (!name || !room) {
      return {
        error: 'Name and room was provided incorrectly'
      }
    }
    const newUser = addUser(socket, name, room)
    callback(newUser)
  })
})

server.listen(port, () => {
  console.log(`Started server at port ${port}!`)
})

