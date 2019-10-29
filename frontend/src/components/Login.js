import React, { useState } from 'react'

import { useCustomErrorHandler } from './hooks'


function Login({ socket, setUser }) {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  const [error, showError] = useCustomErrorHandler()

  const handleLogin = (e) => {
    e.preventDefault()
    socket.emit('join', { name, room }, ({user, error}) => {
      if (error) {
        showError(error)
      }
      else {
        console.log('user')
        setUser(user)
      }
    })
    setName('')
    setRoom('')
  }

  return (
    <div>
      {!error
          ? <form onSubmit={handleLogin}>
            nimi<input type='text' value={name} onChange={(e) => setName(e.target.value)} /><br/>
            huone<input type='text' value={room} onChange={(e) => setRoom(e.target.value)}/><br/>
            <button>kirjaudu</button>
          </form>
          : <p style={{color: 'red'}}>{error}</p>
      }
    </div>
  )
}

export default Login
