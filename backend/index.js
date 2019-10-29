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
    const { error, user } = addUser(socket.id, name, room)
    if (error) {
      return callback({ error })
    }
    callback({ user })
  })
})

server.listen(port, () => {
  console.log(`Started server at port ${port}!`)
})

