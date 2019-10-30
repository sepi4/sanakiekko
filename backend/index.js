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

const { addUser, connectUser, removeUser } = require('./users')


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
  })

  socket.on('reconnectUser', (id, callback) => {
    const user = connectUser(id)
    callback(user)
  })

  socket.on('disconnect', () => {
    // console.log(socket.id)
    const user = removeUser(socket.id)
  })

})

server.listen(port, () => {
  console.log(`Started server at port ${port}!`)
})
