import React from 'react'

function Game({ socket, user, handleLogout }) {

  return (
    <div>
      <div>
        {user.name} <button onClick={handleLogout}>kirjaudu ulos</button>
      </div>
    </div>
  )
}

export default Game
