import React from 'react'

import UsersList from './UsersList'
import Navbar from './Navbar'


function Game({ socket, user, handleLogout }) {
  return (
    <div>
      <Navbar 
        user={user}
        handleLogout={handleLogout}
      />
      <UsersList socket={socket} />
    </div>
  )
}

export default Game
