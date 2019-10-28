import React, { useState } from 'react'

function Login({ socket }) {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  const handleLogin = (e) => {
    console.log('hhhh')
    e.preventDefault()
    socket.emit('join', { name, room }, () => {
      console.log('join callback client')
    })
    setName('')
    setRoom('')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        nimi<input type='text' value={name} onChange={(e) => setName(e.target.value)} /><br/>
        huone<input type='text' value={room} onChange={(e) => setRoom(e.target.value)}/><br/>
        <button>kirjaudu</button>
      </form>
    </div>
  )
}

export default Login
