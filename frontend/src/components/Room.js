import React, { useState, useEffect } from 'react'
import { Button, Header } from 'semantic-ui-react'
import WordForm from './WordForm'

function Room({ socket, user }) {
  const [letters, setLetters] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.emit('getRoomInfo', user.roomName, room => {
      setLetters(room.game.letters)
      setUsers(room.users.map(u => u.name))
    })

    socket.on('updateRoomInfo', room => {
      console.log('updateRoomInfo', room)
      setLetters(room.game.letters)
      setUsers(room.users.map(u => u.name))
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
          <Button color="olive" key={'letter' + i}>
            <Header as="h1">{l}</Header>
          </Button>
        ))}
      </div>
      <Button onClick={handleNewLetters}>uudet kirjaimet</Button>
      <div>
        {letters.length > 0 && <WordForm socket={socket} letters={letters} />}
      </div>

      <div>minun sanat</div>
      <div>
        {users}
      </div>
      <div>chatti alla</div>
    </div>
  )
}

export default Room
