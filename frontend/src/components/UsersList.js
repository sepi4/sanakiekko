import React, { useState, useEffect, } from 'react'

import { toRoomsAndNames } from '../utils/helper'

function UsersList({ socket }) {
  const [users, setUsers] = useState([])

  const sortBy = (arr, key) => {
    arr.sort(function(a, b) {
      const A = a[key].toUpperCase()
      const B = b[key].toUpperCase()
      if (A < B) return -1
      if (A > B) return 1
      return 0
    })
    return arr
  }

  // const rooms = (arr) => {
  //   return arr.reduce((pre, cur) => {
  //     if (pre.indexOf(cur.room) < 0) {
  //       return cur
  //     }
  //   }, [])
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
      setUsers(users)
    })
  }, [socket])

  if ( users ) console.log(toRoomsAndNames(users))
  if ( users ) console.log(toRoomsAndNames(users))

  const arr = toRoomsAndNames(users)


  return (
    <div>
      <h3>Online</h3>
      <ul>
        {Object.keys(arr).map(key => <li>{key} - <ul>{arr[key].map(u => <li>{u.name}</li>)}</ul></li>)}
        {/* {sortBy(users, 'room').map(u => <li key={u.socketId}>{u.name} -> {u.room}</li>)} */}
      </ul>
    </div>
  )
}


export default UsersList