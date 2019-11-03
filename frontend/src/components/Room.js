import React, { useState, useEffect } from 'react'
import { Button, Input } from 'semantic-ui-react'
import WordForm from './WordForm'

function Room({ socket, user }) {
  const [letters, setLetters] = useState([])

  useEffect(() => {
    socket.emit('getRoomInfo', user.roomName, res => {
      setLetters(res.game.letters)
    })

    socket.on('updateRoomInfo', room => {
      console.log('updateRoomInfo', room)
      setLetters(room.game.letters)
    })
    return () => {
      socket.off('updateRoomInfo')
    }
  }, [socket, user.roomName])

  const handleNewLetters = () => {
    // console.log(socket)
    socket.emit('newLetters', user)
  }

  return (
    <div>
      <div>
        {letters.map((l, i) => (
          <Button color="blue" key={'letter' + i}>
            {l}
          </Button>
        ))}
      </div>
      <Button onClick={handleNewLetters}>uudet kirjaimet</Button>
      <div>{letters.length > 0 && <WordForm letters={letters} />}</div>
      <div>minun sanat</div>
      <div>huoneen muut pelajat</div>
      <div>chatti alla</div>
    </div>
  )
}

export default Room
