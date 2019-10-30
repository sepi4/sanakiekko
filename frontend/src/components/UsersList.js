import React, { useState, useEffect } from 'react'

function UsersList({ socket }) {
  const [users, setUsers] = useState([])

  console.log('UsersList socket', socket)

  socket.on('allUsers', (users) => {
    users = users.map(u => <li key={u.socketId}>{u.name}</li>)
    setUsers(users)
  })
  // useEffect(() => {
  //   return () => {
  //     socket.off('allUsers')
  //   }
  // })

  return (
    <ul>
      {users}
    </ul>
  )
}

export default UsersList
