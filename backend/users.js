let users = []

function addUser(id, name, room, socketId) {
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()
  if (!id || !name || !room) {
    return {
      error: 'Name and room was provided incorrectly'
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

function connectUser(id) {
  for (let u of users) {
    if (u.id === id) {
      u.connected = true    
      return u      
    }
  }
}

function removeUser(socketId) {
  console.log('removeUser', socketId)
  for (let u of users) {
    if (u.socketId === socketId) {
      u.connected = false    
      setTimeout(() => {
        if (!u.connected)
          users = users.filter(user => user.socketId !== socketId)
      }, 5000)
      return u      
    }
  }
}

module.exports = {
  addUser,
  connectUser,
  removeUser,
}
