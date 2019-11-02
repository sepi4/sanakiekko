import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'

function Room({ socket, user }) {
  const [letters, setLetters] = useState([])

  useEffect(() => {
    console.log('useEffect')
    socket.on('newLetters', data => {
      console.log('newLetters', data)
    })
  }, [])

  const handleNewGame = () => {
    // console.log(socket)
    socket.emit('newGame', user)
  }

  return (
    <div>
      <div>{letters}</div>
      <div>
        <input type="text" />
      </div>
      <Button onClick={handleNewGame}>uusi peli</Button>
      <div>chatti</div>
    </div>
  )
}

export default Room
