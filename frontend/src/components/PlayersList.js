import React from 'react'

function PlayersList({ users }) {
  return (
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
  )
}

export default PlayersList
