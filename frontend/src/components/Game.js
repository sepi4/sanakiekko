import React from 'react'

function Game({ socket, user, handleLogout }) {
  socket.on('usersList', (data) => {
    console.log('usersList', data)
  })


  return (
    <div>
      <div>
        {user.name} <button onClick={handleLogout}>kirjaudu ulos</button>
        <p>huone: {user.room}</p>
      </div>
    </div>
  )
}

export default Game
