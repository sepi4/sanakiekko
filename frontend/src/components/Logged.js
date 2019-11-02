import React, { useEffect } from 'react'
import {
  // BrowserRouter as Router,
  Route,
  // Switch,
  // Link,
  useHistory,
} from 'react-router-dom'

import Room from './Room'
import Navbar from './Navbar'

function Logged({ socket, user, handleLogout }) {
  const history = useHistory()
  useEffect(() => {
    history.push(`/room/${user.roomName}`)
  }, [user, history])

  return (
    <div>
      <Route exact path={`/room/${user.roomName}`}>
        <Navbar user={user} handleLogout={handleLogout} />
        <Room socket={socket} user={user} />
      </Route>
    </div>
  )
}

export default Logged
