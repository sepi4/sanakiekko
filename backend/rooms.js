const { newRandomLetters } = require('./utils')
let rooms = []

function addUser(id, name, roomName, socketId) {
  name = name.trim().toLowerCase()
  roomName = roomName.trim().toLowerCase()
  if (!name || !roomName) {
    return {
      error: 'nimi ja huone on annettu väärin',
    }
  }
  for (let r of rooms) {
    if (r.users.find(u => u.name === name)) {
      return {
        error: `käyttäjätunnus '${name}' on varattu`,
      }
    }
  }
  let roomToAdd = rooms.find(r => r.roomName === roomName)
  if (!roomToAdd) {
    rooms.push({
      roomName,
      users: [],
      game: {
        letters: [],
        active: false,
        rules: {
          maxWords: 10,
          lettersCount: 7,
        },
      },
    })
    roomToAdd = rooms[rooms.length - 1]
  }
  const user = {
    name,
    roomName,
    id,
    socketId,
    connected: true,
    words: [],
  }
  roomToAdd.users = roomToAdd.users.concat(user)
  return { user }
}

function connectUser(id, newSocketId) {
  for (let room of rooms) {
    for (let u of room.users) {
      if (u.id === id) {
        u.connected = true
        u.socketId = newSocketId
        return u
      }
    }
  }
}

function removeUserNow(socketId) {
  let index = 0
  for (let room of rooms) {
    for (let i = 0; i < room.users.length; i++) {
      if (room.users[i].socketId === socketId) {
        const user = room.users[i]
        room.users.splice(i, 1)
        if (room.users.length < 1) {
          rooms.splice(index, 1)
        }
        return user
      }
    }
    index++
  }
}

function removeUserLater(socketId) {
  for (let room of rooms) {
    for (let u of room.users) {
      if (u.socketId === socketId) {
        u.connected = false
        setTimeout(() => {
          if (!u.connected) {
            removeUserNow(socketId)
          }
        }, 3000)
        return u
      }
    }
  }
}

function allUsers() {
  return rooms
}

function newLetters(roomName) {
  for (let r of rooms) {
    if (r.roomName === roomName) {
      r.game.letters = newRandomLetters(r.game.rules.lettersCount)
      return r
    }
  }
}

module.exports = {
  addUser,
  connectUser,
  removeUserNow,
  removeUserLater,
  allUsers,
  newLetters,
}
