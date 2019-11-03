const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')

const port = process.env.PORT || 1111
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const uuidv1 = require('uuid/v1')

app.use(express.static(publicPath))

const {
  addUser,
  connectUser,
  removeUserNow,
  removeUserLater,
  allUsers,
  newLetters,
  addWordToUser,
} = require('./rooms')

const { removeProperties } = require('./utils')

io.on('connection', socket => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser(uuidv1(), name, room, socket.id)

    if (error) {
      return callback({ error })
    }
    socket.join(room)

    callback({ user })
    io.emit('allUsers', allUsers())
  })

  socket.on('reconnectUser', (id, callback) => {
    const user = connectUser(id, socket.id)
    if (!user || !user.roomName) {
      return
    }
    socket.join(user.roomName)
    // callback(user)
    io.emit('allUsers', allUsers())
  })

  socket.on('disconnectNow', () => {
    removeUserNow(socket.id)
    io.emit('allUsers', allUsers())
  })

  socket.on('disconnect', () => {
    removeUserLater(socket.id)
    io.emit('allUsers', allUsers())
  })

  socket.on('loadAllUsers', callback => {
    callback(allUsers())
    // const user = removeUserLater(socket.id)
    io.emit('allUsers', allUsers())
  })

  socket.on('newLetters', user => {
    const room = newLetters(user.roomName)
    // room = removeProperties(room)
    io.to(user.roomName).emit('updateRoomInfo', room)
  })

  socket.on('getRoomInfo', (roomName, callback) => {
    const room = allUsers().find(r => r.roomName === roomName)
    callback(room)
  })

  socket.on('returnWord', word => {
    const room = addWordToUser(socket.id, word)
    io.to(room.roomName).emit('updateRoomInfo', room)
  })
})

server.listen(port, () => {
  console.log(`Started server at port ${port}!`)
})
