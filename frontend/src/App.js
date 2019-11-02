import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  useHistory,
  // Route,
  // Switch,
  // Link,
} from 'react-router-dom'

import Login from './components/Login'
import Logged from './components/Logged'
import UsersList from './components/UsersList'

import { Container, Grid } from 'semantic-ui-react'

function App({ socket }) {
  const [user, setUser] = useState(null)
  const history = useHistory()

  const handleLogout = () => {
    socket.emit('disconnectNow')
    localStorage.removeItem('sanakiekkoUserId')
    setUser(null)
    history.push('')
  }

  const handleSetUser = newUser => {
    setUser(newUser)
  }

  return (
    <Container>
      <Router>
        {!user ? (
          <Grid>
            <Grid.Column width={7}>
              <UsersList socket={socket} />
            </Grid.Column>
            <Grid.Column width={9}>
              <Login socket={socket} handleSetUser={handleSetUser} />
            </Grid.Column>
          </Grid>
        ) : (
          <Logged socket={socket} user={user} handleLogout={handleLogout} />
        )}
      </Router>
    </Container>
  )
}

export default App
