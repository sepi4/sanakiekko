import React, { useState, useEffect } from 'react'

import { Message } from 'semantic-ui-react'

import WordForm from './WordForm'
import PlayersList from './PlayersList'
import MyWords from './MyWords'
import Letters from './Letters'
import Checking from './Checking'
import Chat from './Chat'
import Voting from './Voting'

import { useCustomErrorHandler } from './hooks'

function Room({ socket, user }) {
  const [letters, setLetters] = useState([])
  const [users, setUsers] = useState([])
  const [myWords, setMyWords] = useState(user.words)
  const [error, showError] = useCustomErrorHandler()
  const [info, showInfo] = useCustomErrorHandler()
  const [checking, setChecking] = useState(false)
  const [voting, setVoting] = useState(false)

  const roomSetters = rooms => {
    const room = rooms.find(r => r.roomName === user.roomName)
    setLetters(room.game.letters)
    setUsers(room.users.filter(u => u.connected))
    setMyWords(room.users.find(u => user.name === u.name).words)
    setChecking(room.game.checking)
    setVoting(room.voting)
    showInfo(room.info)
  }

  useEffect(() => {
    socket.emit('getRoomsInfo', undefined, rooms => {
      roomSetters(rooms)
    })

    socket.on('allUsers', rooms => {
      roomSetters(rooms)
    })

    return () => {
      socket.off('allUsers')
    }
  }, [socket])

  const removeWord = word => {
    socket.emit('removeWord', word, error => {
      showError(error)
    })
  }

  return (
    <div>
      {error && <Message error header={error} />}
      {info && <Message info header={info} />}
      <Voting user={user} action="newLetters" socket={socket} voting={voting}>
        uudet kirjaimet
      </Voting>
      <Letters letters={letters} />
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
