import React, { useState } from 'react'

import Login from './components/Login'
import Game from './components/Game'

import { Container } from 'semantic-ui-react'

function App({socket}) {
  const [user, setUser] = useState(null)
  const handleLogout = () => {
    socket.emit('disconnectNow')
    localStorage.removeItem('sanakiekkoUserId')
    setUser(null)
  }
  console.log('App')
  return (
    <Container>
      {
        !user
          ? <Login 
            socket={socket} 
            setUser={setUser} 
          />
          : <Game 
            socket={socket} 
            user={user}
            handleLogout={handleLogout}
          />
      }
    </Container>
  )
}

export default App
