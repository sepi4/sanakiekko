import React from 'react'
function Navbar({ user, handleLogout }) {
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

export default Navbar
