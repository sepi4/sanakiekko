import React, { useState, useEffect } from 'react'

import { useCustomErrorHandler } from './hooks'


function Login({ socket, setUser }) {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  const [error, showError] = useCustomErrorHandler()

  useEffect(() => {
    const id = localStorage.getItem('sanakiekkoUserId')
    if (id) {
      socket.emit('reconnectUser', id, (user) => {
        console.log('reconnect callback', user)
        if (user) {
          setUser(user)
        } else {
          localStorage.removeItem('sanakiekkoUserId')
        }
      })
    }
  }, [socket, setUser])


  const handleLogin = (e) => {
    e.preventDefault()
    socket.emit('join', { name, room }, ({user, error}) => {
      if (error) {
        showError(error)
      } else {
        console.log('join callback', user)
        localStorage.setItem('sanakiekkoUserId', user.id)
        setUser(user)
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        nimi<input type='text' value={name} onChange={(e) => setName(e.target.value)} /><br/>
        huone<input type='text' value={room} onChange={(e) => setRoom(e.target.value)}/><br/>
        <button>kirjaudu</button>
        {error && <span style={{color: 'red'}}>{error}</span>}
      </form>
    </div>
  )
}

export default Login
