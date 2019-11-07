import React from 'react'
import { Button, Header } from 'semantic-ui-react'

export default function Voting({ children, user, socket, voting, action }) {
  const vote = () => {
    socket.emit('votingStart', action, () => {
      console.log('callback')
    })
  }

  const answer = e => {
    const a = e.target.value
    socket.emit('votingAnswer', a, () => {
      console.log('answer callback')
    })
  }

  if (
    voting.active &&
    (voting.yes.find(id => id === user.id) ||
      voting.no.find(id => id === user.id))
  ) {
    return <p>Odotetaan muiden vastausksia</p>
  }

  return (
    <div>
      {voting.active ? (
        <div
          style={{
            background: 'pink',
            textAlign: 'center',
            padding: 10,
            borderRadius: 25,
          }}
        >
          <Header>{voting.question}</Header>
          <Button color="black" value="yes" onClick={answer}>
            kyllä
          </Button>
          <Button color="black" value="no" onClick={answer}>
            ei
          </Button>
        </div>
      ) : (
        <div>
          <Button
            style={{ width: '100%', margin: '0 0 1rem 0' }}
            onClick={vote}
          >
            {children}
          </Button>
        </div>
      )}
    </div>
  )
}
