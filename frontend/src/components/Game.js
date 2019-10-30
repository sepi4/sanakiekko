import React from 'react'

function Game({ socket, user, handleLogout }) {
  socket.on('usersList', (data) => {
    console.log('usersList', data)
  })

  socket.on('allUsers', (data) => {
    console.log('allUsers', data)
  })


  return (
    <div>
      <div style={{
        backgroundColor: "yellow",
        padding: '5px',
      }}>
        huone: {user.room}, käyttäjä: {user.name} <button onClick={handleLogout}>kirjaudu ulos</button>
      </div>
    </div>
  )
}

export default Game
