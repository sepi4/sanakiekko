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
        error: `username '${name}' is already taken`,
      }
    }
  }
  let roomToAdd = rooms.find(r => r.roomName === roomName)
  if (!roomToAdd) {
    rooms.push({
      roomName,
      users: [],
    })
    roomToAdd = rooms[rooms.length - 1]
  }
  const user = {
    name,
    roomName,
    id,
    socketId,
    connected: true,
  }
  roomToAdd.users = roomToAdd.users.concat(user)
  console.log(rooms)
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
        console.log('removeUserNow', rooms)
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
          // console.log('setTimeout')
          if (!u.connected) {
            removeUserNow(socketId)
            // console.log('filtering users')
            // users = users.filter(user => user.socketId !== socketId)
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

module.exports = {
  addUser,
  connectUser,
  removeUserNow,
  removeUserLater,
  allUsers,
}
