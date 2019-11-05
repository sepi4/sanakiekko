import React, { useState, useEffect } from 'react'

import { Button, Message } from 'semantic-ui-react'

import WordForm from './WordForm'
import PlayersList from './PlayersList'
import MyWords from './MyWords'
import Letters from './Letters'

import { useCustomErrorHandler } from './hooks'

function Room({ socket, user }) {
  const [letters, setLetters] = useState([])
  const [users, setUsers] = useState([])
  const [myWords, setMyWords] = useState(user.words)
  const [error, showError] = useCustomErrorHandler()

  useEffect(() => {
    socket.emit('getRoomsInfo', user.roomName, rooms => {
      const room = rooms.find(r => r.roomName === user.roomName)
      setLetters(room.game.letters)
      setUsers(room.users.filter(u => u.connected))
      setMyWords(room.users.find(u => user.name === u.name).words)
    })

    socket.on('allUsers', rooms => {
      const room = rooms.find(r => r.roomName === user.roomName)
      setLetters(room.game.letters)
      setUsers(room.users.filter(u => u.connected))
      setMyWords(room.users.find(u => user.name === u.name).words)
    })

    return () => {
      socket.off('allUsers')
    }
  }, [socket, user])

  const handleNewLetters = () => {
    socket.emit('newLetters', user)
  }

  const removeWord = (word) => {
    socket.emit('removeWord', word, (error) => {
      showError(error)
    })
  }

  return (
    <div>
      {error && <Message error header={error} />}
      <Button onClick={handleNewLetters}>uudet kirjaimet</Button>
      <Letters letters={letters} />
      <WordForm socket={socket} letters={letters} />
      <MyWords words={myWords} removeWord={removeWord}/>
      <PlayersList users={users} />
      <div>chatti:</div>
    </div>
  )
}

export default Room
