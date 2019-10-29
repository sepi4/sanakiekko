import React, { useState } from 'react'

import Login from './components/Login'
import Game from './components/Game'

function App({socket}) {
  const [user, setUser] = useState(null)
  return (
    <div>
      {!user
        ? <Login socket={socket} setUser={setUser} />
        : <Game />
      }
    </div>
  )
}

export default App
