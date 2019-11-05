import React from 'react'

function PlayersList({ users }) {
  return (
    <div>
      pelajaat:
      <ul>
        {users.map((u, i) => (
          <li key={u + i} style={{ listStyle: 'none' }}>
            {u.name} - sanoja: {u.words.length}, pisteitä: {u.points}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlayersList
