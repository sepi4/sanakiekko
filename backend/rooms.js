const { newRandomLetters, subSet } = require('./utils')

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
        checking: false,
        rules: {
          maxWords: 3,
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
    wordsCount: 0,
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
        }, 30000)
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
      r.game.active = true
      return r
    }
  }
}

function addWordToUser(socketId, word) {
  word = word.trim()
  let { room, user } = findRoomAndUser(socketId)
  if (
    user &&
    subSet(word, room.game.letters) &&
    !user.words.includes(word) &&
    room.game.active
  ) {
    user.words.push(word)
    user.wordsCount = user.words.length
    if (user.words.length === room.game.rules.maxWords) {
      checkWords(socketId)
    }
    return { room }
  }
  return {
    error: 'Server: virhe sanan lisäyksessä',
  }
}

function removeWord(socketId, word) {
  let { room, user } = findRoomAndUser(socketId)
  if (user && room && room.game.active) {
    user.words = user.words.filter(w => w !== word)
    return { room }
  }
  return {
    error: 'Server: virhe sanan poistossa',
  }
}

function checkWords(socketId) {
  let { room, user } = findRoomAndUser(socketId)
  if (room.game) {
    room.game.active = false
    room.game.checking = true
  }
  return { room }
}

function findRoomAndUser(socketId) {
  for (let r of rooms) {
    let user = r.users.find(u => u.socketId === socketId)
    if (user) {
      return { room: r, user }
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
  addWordToUser,
  removeWord,
}
