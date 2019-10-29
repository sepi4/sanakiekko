let users = []

function addUser(id, name, room) {
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
  }
  users = users.concat(user)
  return { user }
}

module.exports = {
  addUser,
}
