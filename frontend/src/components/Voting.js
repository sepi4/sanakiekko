import React from 'react'

export default function Voting({ socket, voting }) {
  const vote = () => {
    socket.emit('votingStart', 'newLetters', () => {
      console.log('callback')
    })
  }
  const answer = e => {
    const a = e.target.value
    socket.emit('votingAnswer', a, () => {
      console.log('answer callback')
    })
  }

  return (
    <div>
      {voting.active ? (
        <div>
          {voting.question}
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
    </div>
  )
}
