import React, { useState, useEffect, useReducer } from 'react'

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
  // function reducer(state, action) {
  //   switch (action.type) {
  //     case 'SET_LETTERS':
  //       return {
  //         ...state,
  //         letters: action.payload,
  //       }
  //     case 'SET_USERS':
  //       return {
  //         ...state,
  //         users: action.payload,
  //       }
  //     case 'SET_MY_WORDS':
  //       return {
  //         ...state,
  //         myWords: action.payload,
  //       }
  //     case 'SET_CHECKING':
  //       return {
  //         ...state,
  //         checking: action.payload,
  //       }
  //     case 'SET_VOTING':
  //       return {
  //         ...state,
  //         voting: action.payload,
  //       }
  //     default:
  //       return state
  //   }
  // }
  // const [{ letters, users, myWords, checking, voting }, dispatch] = useReducer(
  //   reducer,
  //   {
  //     letters: [],
  //     users: [],
  //     myWords: user.words,
  //     checking: false,
  //     voting: false,
  //   },
  // )

  const [
    { letters, users, myWords, checking, voting },
    setRoomValues,
  ] = useState({
    letters: [],
    users: [],
    myWords: user.words,
    checking: false,
    voting: false,
  })

  // const [letters, setLetters] = useState([])
  // const [users, setUsers] = useState([])
  // const [myWords, setMyWords] = useState(user.words)
  const [error, showError] = useCustomErrorHandler()
  const [info, showInfo] = useCustomErrorHandler()
  // const [checking, setChecking] = useState(false)
  // const [voting, setVoting] = useState(false)

  const roomSetters = rooms => {
    const room = rooms.find(r => r.roomName === user.roomName)

    setRoomValues({
      letters: room.game.letters,
      users: room.users.filter(u => u.connected),
      myWords: room.users.find(u => user.name === u.name).words,
      checking: room.game.checking,
      voting: room.voting,
    })
    showInfo(room.info)

    // setLetters(room.game.letters)
    // setUsers(room.users.filter(u => u.connected))
    // setMyWords(room.users.find(u => user.name === u.name).words)
    // setChecking(room.game.checking)
    // setVoting(room.voting)

    // dispatch({ type: 'SET_LETTERS', payload: room.game.letters })
    // dispatch({ type: 'SET_USERS', payload: room.users.filter(u => u.connected) })
    // dispatch({ type: 'SET_MY_WORDS', payload: room.users.find(u => user.name === u.name).words })
    // dispatch({ type: 'SET_CHECKING', payload: room.game.checking })
    // dispatch({ type: 'SET_VOTING', payload: room.voting })
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

  console.log('Room')
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
