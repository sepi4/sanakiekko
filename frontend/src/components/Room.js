import React, { useState, useEffect } from 'react'

import { Button, Message } from 'semantic-ui-react'

import WordForm from './WordForm'
import PlayersList from './PlayersList'
import MyWords from './MyWords'
import Letters from './Letters'
import Checking from './Checking'
import Chat from './Chat'

import { useCustomErrorHandler } from './hooks'

function Room({ socket, user }) {
  const [letters, setLetters] = useState([])
  const [users, setUsers] = useState([])
  const [myWords, setMyWords] = useState(user.words)
  const [error, showError] = useCustomErrorHandler()
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    socket.emit('getRoomsInfo', user.roomName, rooms => {
      const room = rooms.find(r => r.roomName === user.roomName)
      setLetters(room.game.letters)
      setUsers(room.users.filter(u => u.connected))
      setMyWords(room.users.find(u => user.name === u.name).words)
      setChecking(room.game.checking)
    })

    socket.on('allUsers', rooms => {
      const room = rooms.find(r => r.roomName === user.roomName)
      setLetters(room.game.letters)
      setUsers(room.users.filter(u => u.connected))
      setMyWords(room.users.find(u => user.name === u.name).words)
      setChecking(room.game.checking)
    })

    return () => {
      socket.off('allUsers')
    }
  }, [socket, user])

  const handleNewLetters = () => {
    socket.emit('newLetters', user)
  }

  const removeWord = word => {
    socket.emit('removeWord', word, error => {
      showError(error)
    })
  }

  return (
    <div>
      {error && <Message error header={error} />}
      <Letters letters={letters} />
      <Button onClick={handleNewLetters}>uudet kirjaimet</Button>
      {!checking ? (
        <>
          <WordForm socket={socket} letters={letters} />
          <MyWords words={myWords} removeWord={removeWord} />
        </>
      ) : (
        <Checking user={user} socket={socket} />
      )}
      <PlayersList users={users} />
      <Chat />
    </div>
  )
}

export default Room
