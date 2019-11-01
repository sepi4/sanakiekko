import React, { useState } from 'react'

import Login from './components/Login'
import Game from './components/Game'
import UsersList from './components/UsersList'

import { Container, Grid } from 'semantic-ui-react'

function App({socket}) {
  const [user, setUser] = useState(null)
  const handleLogout = () => {
    socket.emit('disconnectNow')
    localStorage.removeItem('sanakiekkoUserId')
    setUser(null)
  }
  return (
    <Container>
      {
        !user
          ? 
            <Grid>
              <Grid.Column width={4} >
                <UsersList socket={socket} />
              </Grid.Column>
              <Grid.Column width={12} >
                <Login socket={socket} setUser={setUser} />
              </Grid.Column>
            </Grid>
          : 
            <Game 
              socket={socket} 
              user={user}
              handleLogout={handleLogout}
            />
      }
    </Container>
  )
}

export default App
