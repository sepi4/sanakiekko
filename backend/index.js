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

let votingTimeout = undefined

const {
  addUser,
  connectUser,
  removeUserNow,
  removeUserLater,
  allUsers,
  // newLetters,
  addWordToUser,
  removeWord,
  toggleWord,
  votingStart,
  votingAnswer,
  votingResult,
  findRoomAndUser,
  // newInfo,
} = require('./rooms')

// const { removeProperties } = require('./utils')

io.on('connection', socket => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser(uuidv1(), name, room, socket.id)

    if (error) {
      return callback({ error })
    }
    socket.join(room)

    callback({ user })
    io.emit('allUsers', allUsers())
    // io.to(room.roomName).emit('updateRoomInfo', room)
  })

  socket.on('reconnectUser', (id, callback) => {
    const user = connectUser(id, socket.id)
    if (!user || !user.roomName) {
      return
    }
    socket.join(user.roomName)
    callback(user)
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

  // socket.on('newLetters', user => {
  //   newLetters(socket.id)
  //   io.emit('allUsers', allUsers())
  // })

  socket.on('votingStart', action => {
    // let { room } = findRoomAndUser(socket.id)
    // if (room.voting.active) return

    // let votingInterval = setInterval(() => {
    //   setCountdown(room)
    //   io.emit('allUsers', allUsers())
    // }, 1000)

    // votingTimeout = setTimeout(() => {
    //   if (!room.voting.active) return

    //   votingResult('NO', room)
    //   clearTimeout(votingTimeout)
    //   votingTimeout = undefined
    //   clearInterval(votingInterval)

    //   io.emit('allUsers', allUsers())
    // }, 11000)

    votingStart(socket.id, 'Uudet kirjaimet?', action, io)
    io.emit('allUsers', allUsers())
  })

  socket.on('votingAnswer', (answer, callback) => {
    votingAnswer(socket.id, answer)
    io.emit('allUsers', allUsers())
  })

  socket.on('getRoomsInfo', (x, callback) => {
    // const room = allUsers().find(r => r.roomName === roomName)
    callback(allUsers())
  })

  socket.on('addWord', (word, callback) => {
    // const room = addWordToUser(socket.id, word)
    // io.to(room.roomName).emit('updateRoomInfo', room)
    const { room, error } = addWordToUser(socket.id, word)
    if (error) {
      callback(error)
    } else {
      io.emit('allUsers', allUsers())
    }
  })

  socket.on('removeWord', (word, callback) => {
    const { room, error } = removeWord(socket.id, word)
    if (error) {
      callback(error)
    } else {
      io.emit('allUsers', allUsers())
    }
  })

  socket.on('toggleWord', ({ user, word }) => {
    const { error } = toggleWord(user, word, socket.id)
    if (error) {
      // callback(error)
    } else {
      io.emit('allUsers', allUsers())
    }
  })

  // socket.on('checkWords', () => {})
})

server.listen(port, () => {
  console.log(`Started server at port ${port}!`)
})
