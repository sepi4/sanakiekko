import React from 'react'
import Game from './Game'

import Navbar from './Navbar'


function Logged({ socket, user, handleLogout }) {
  return (
    <div>
      <Navbar 
        user={user}
        handleLogout={handleLogout}
      />
      <Game 
        socket={socket} 
        user={user}
      />
    </div>
  )
}

export default Logged
