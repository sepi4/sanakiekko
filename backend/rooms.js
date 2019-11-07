const { newRandomLetters, subSet, toggleValueInArray } = require('./utils')

let rooms = []
let votingTimeout = undefined

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
          minWordLength: 3,
          lettersCount: 7,
        },
      },
      voting: {
        active: false,
        timer: 10000,
        yes: [],
        no: [],
        question: '',
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
    points: 0,
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

function newLetters(room) {
  // let { room, user } = findRoomAndUser(socketId)
  removeAllWords(room)
  if (room.roomName) {
    room.game.letters = newRandomLetters(room.game.rules.lettersCount)
    room.game.active = true
    room.game.checking = false
    return room
  }
}

function addWordToUser(socketId, text) {
  text = text.trim()
  const word = {
    text,
    usersAccepted: [],
  }
  let { room, user } = findRoomAndUser(socketId)
  if (
    user &&
    subSet(word.text, room.game.letters) &&
    !user.words.find(w => w.text === word.text) &&
    room.game.active &&
    room.game.rules.minWordLength <= word.text.length
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

function removeWord(socketId, text) {
  let { room, user } = findRoomAndUser(socketId)
  if (user && room && room.game.active) {
    user.words = user.words.filter(w => w.text !== text)
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

function removeAllWords(room) {
  for (let u of room.users) {
    u.words = []
  }
}

function removeAllPoints(room) {
  for (let u of room.users) {
    u.points = 0
  }
}

function toggleWord(modifiedUser, word, accepterSocketId) {
  let accepter = findRoomAndUser(accepterSocketId)
  let accepterRoom = accepter.room
  let accepterUser = accepter.user

  let { room, user } = findRoomAndUser(modifiedUser.socketId)

  if (room && user && accepterRoom && accepterUser) {
    let wordObj = user.words.find(w => w.text === word.text)
    if (wordObj) {
      wordObj.usersAccepted = toggleValueInArray(
        wordObj.usersAccepted,
        accepterUser.id,
      )
    } else {
      return { error: 'Server: virhe sanan togglauksessa' }
    }
  }
  return { error: 'Server: virhe sanan togglauksessa' }
}

function votingAnswer(socketId, answer) {
  let { room, user } = findRoomAndUser(socketId)
  console.log(user.id)
  console.log(room.voting.yes)
  console.log(room.voting.no)
  if (
    room.voting.active &&
    !room.voting.yes.find(id => id === user.id) &&
    !room.voting.no.find(id => id === user.id)
  ) {
    if (answer === 'yes') room.voting.yes.push(user.id)
    if (answer === 'no')  room.voting.no.push(user.id)
    votingCheck(room)
  }
}

function votingStart(socketId, question, action) {
  console.log('votingStart')
  let { room, user } = findRoomAndUser(socketId)
  if (room.voting.active) {
    return
  } else {
    room.voting.active = true
    room.voting.question = `${user.name}: ${question}`
    room.voting.yes.push(user.id)
    votingCheck(room, action)
  }

  // votingTimeout = setTimeout(() => {
  //   votingResult('NO', room)
  // }, room.voting.timer)
}

function votingResult(result, room, action) {
  console.log(result)


  if (result === 'YES') {
    switch (action) {
      case 'newLetters':
        newLetters(room)
        break
      default:
        break
    }
  }

  room.voting = {
    active: false,
    yes: [],
    no: [],
    question: '',
  }
  // clearTimeout(votingTimeout)
}

function votingCheck(room, action) {
  const users = room.users.length
  const yes = room.voting.yes.length
  const no = room.voting.no.length

  if (yes * 2 > users) votingResult('YES', room, action)
  if (no * 2 > users) votingResult('NO', room)
  if (no + yes === users) votingResult('NO', room)
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
  toggleWord,
  votingStart,
  votingAnswer,
  votingResult,
  findRoomAndUser,
}
