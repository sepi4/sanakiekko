import React from 'react'

import Login from './components/Login'

function App({socket}) {
  return (
    <div>
      <Login socket={socket} />
    </div>
  )
}

export default App
