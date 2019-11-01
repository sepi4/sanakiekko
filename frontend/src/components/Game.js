import React from 'react'

import Navbar from './Navbar'


function Game({ socket, user, handleLogout }) {
  return (
    <div>
      <Navbar 
        user={user}
        handleLogout={handleLogout}
      />
    </div>
  )
}

export default Game
