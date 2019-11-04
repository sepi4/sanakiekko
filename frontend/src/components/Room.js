import React, { useState, useEffect } from 'react'
import { Button, Header } from 'semantic-ui-react'
import WordForm from './WordForm'

function Room({ socket, user }) {
  const [letters, setLetters] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.emit('getRoomsInfo', user.roomName, rooms => {
      const room = rooms.find(r => r.roomName === user.roomName)
      setLetters(room.game.letters)
      setUsers(room.users.filter(u => u.connected))
    })

    socket.on('allUsers', rooms => {
      const room = rooms.find(r => r.roomName === user.roomName)
      setLetters(room.game.letters)
      setUsers(room.users.filter(u => u.connected))
    })
    return () => {
      socket.off('allUsers')
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
      <div>minun sanat:</div>
      <div>
        pelajaat:
        <ul>
          {users.map((u, i) => (
            <li key={u + i}>
              {u.name} - {u.words.length}
            </li>
          ))}
        </ul>
      </div>
      <div>chatti:</div>
    </div>
  )
}

export default Room
