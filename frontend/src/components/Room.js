import React, { useState, useEffect } from 'react'

import { Button, Message, Progress } from 'semantic-ui-react'

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
  const [voting, setVoting] = useState(false)

  const roomSetters = rooms => {
    const room = rooms.find(r => r.roomName === user.roomName)
    setLetters(room.game.letters)
    setUsers(room.users.filter(u => u.connected))
    setMyWords(room.users.find(u => user.name === u.name).words)
    setChecking(room.game.checking)
    setVoting(room.voting.active)
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
  }, [socket, user])

  const handleNewLetters = () => {
    socket.emit('newLetters', user)
  }

  const vote = () => {
    socket.emit('votingStart', () => {
      console.log('callback')
    })
  }

  const removeWord = word => {
    socket.emit('removeWord', word, error => {
      showError(error)
    })
  }

  const answer = e => {
    const a = e.target.value
    socket.emit('votingAnswer', a, () => {
      console.log('answer yes callback')
    })
  }

  return (
    <div>
      {voting ? (
        <div>
          Haluatko uudet kirjaimet?
          <Progress
            style={{ width: '100%', margin: '0' }}
            size="tiny"
            percent={85}
            color="blue"
          />
          <button value="yes" onClick={answer}>
            kyllä
          </button>
          <button value="no" onClick={answer}>
            ei
          </button>
        </div>
      ) : (
        <div>
          <button onClick={vote}>vote</button>
        </div>
      )}

      {error && <Message error header={error} />}
      <Button
        style={{ width: '100%', margin: '0 0 1rem 0' }}
        onClick={handleNewLetters}
      >
        uudet kirjaimet
      </Button>
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
