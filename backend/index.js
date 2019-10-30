const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')

const port = process.env.PORT || 1111
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const uuidv1 = require('uuid/v1');

app.use(express.static(publicPath))

const { 
  addUser, 
  connectUser, 
  removeUserNow, 
  removeUserLater, 
  allUsers,
} = require('./users')


io.on('connection', socket => {
  // console.log('connection', socket.id)

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser(
      uuidv1(), 
      name, 
      room,
      socket.id
    )

    if (error) {
      return callback({ error })
    }
    callback({ user })

    io.emit('allUsers', allUsers())
  })

  socket.on('reconnectUser', (id, callback) => {
    console.log('reconnectUser')
    const user = connectUser(id, socket.id)
    callback(user)
    io.emit('allUsers', allUsers())
  })

  socket.on('disconnectNow', () => {
    // console.log('dis')
    const user = removeUserNow(socket.id)
    io.emit('allUsers', allUsers())
  })

  socket.on('disconnect', () => {
    const user = removeUserLater(socket.id)
    io.emit('allUsers', allUsers())
  })

})

server.listen(port, () => {
  console.log(`Started server at port ${port}!`)
})
