let users = []

function addUser(id, name, room, socketId) {
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()
  if (!name || !room) {
    return {
      error: 'Name and room was provided incorrectly'
    }
  }
  if (users.find(u => u.name === name)) {
    return {
      error: `'${name}' is already taken`
    }
  }
  const user = {
    name,
    room,
    id,
    socketId,
    connected: true,
  }
  users = users.concat(user)
  return { user }
}

function connectUser(id, newSocketId) {
  for (let u of users) {
    if (u.id === id) {
      u.connected = true    
      u.socketId = newSocketId
      return u      
    }
  }
}

function removeUserNow(socketId) {
  for ( let i = 0; i < users.length; i++) {
    if (users[i].socketId === socketId) {
      const user = users[i]
      users.splice(i, 1)
      return user
    }
  }
}

function removeUserLater(socketId) {
  for (let u of users) {
    if (u.socketId === socketId) {
      u.connected = false    
      setTimeout(() => {
        // console.log('setTimeout')
        if (!u.connected) {
          // console.log('filtering users')
          users = users.filter(user => user.socketId !== socketId)
        }
      }, 5000)
      return u      
    }
  }
}

function allUsers() {
  // console.log(users.length)
  return users.map(u => {
    return u
  })
}

module.exports = {
  addUser,
  connectUser,
  removeUserNow,
  removeUserLater,
  allUsers,
}
