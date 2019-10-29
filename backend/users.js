let users = []

function addUser(socket, name, room) {
  users = users.concat({
    name,
    room,
    id: socket.id,
  })
  return users[users.length - 1]
}

module.exports = {
  addUser,
}
