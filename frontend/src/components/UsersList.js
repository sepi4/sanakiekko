import React, { useState, useEffect, } from 'react'

function UsersList({ socket }) {
  const [users, setUsers] = useState([])

  // const sortBy = (arr, key) => {
  //   arr.sort(function(a, b) {
  //     const A = a[key].toUpperCase()
  //     const B = b[key].toUpperCase()
  //     if (A < B) return -1
  //     if (A > B) return 1
  //     return 0
  //   })
  //   return arr
  // }


  useEffect(() => {
    socket.on('allUsers', (users) => {
      setUsers(users)
    })
    return () => {
      socket.off('allUsers')
    }
  }, [socket])

  useEffect(() => {
    socket.emit('loadAllUsers', (users) => {
      console.log('useEffect users', users)
      setUsers(users)
    })
  }, [socket])


  // let arr = toRoomsAndNames(users)
  return (
    <div>
      <h3>Huoneet - käyttäjät</h3>
      <ul>
        {users
            .map((room, i) => 
              <li key={room.roomName + i}>{room.roomName}
              <ul>
                {room.users.map(user => <li key={user.name}>{user.name}</li>)}
              </ul>
            </li>)
        }
      </ul>
    </div>
  )
}


export default UsersList
