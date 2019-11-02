import React, { useState, useEffect } from 'react'

import { useCustomErrorHandler } from './hooks'

import { Message, Button, Form } from 'semantic-ui-react'

function Login({ socket, handleSetUser }) {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  const [error, showError] = useCustomErrorHandler()

  useEffect(() => {
    const id = localStorage.getItem('sanakiekkoUserId')
    if (id) {
      socket.emit('reconnectUser', id, user => {
        // console.log('reconnect callback', user)
        if (user) {
          handleSetUser(user)
        } else {
          localStorage.removeItem('sanakiekkoUserId')
        }
      })
    }
  }, [socket, handleSetUser])

  const handleLogin = e => {
    e.preventDefault()
    socket.emit('join', { name, room }, ({ user, error }) => {
      if (error) {
        showError(error)
      } else {
        // console.log('join callback', user)
        localStorage.setItem('sanakiekkoUserId', user.id)
        handleSetUser(user)
      }
    })
  }

  // console.log('Login')
  return (
    <div>
      <Form error onSubmit={handleLogin}>
        <Form.Input
          label="nimi"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Form.Input
          label="huone"
          type="text"
          value={room}
          onChange={e => setRoom(e.target.value)}
        />
        <Button>kirjaudu</Button>
        <Message error header={error} />
      </Form>
    </div>
  )
}

export default Login
