import React from 'react'
import TogglableCard from './TogglableCard'

export default function PlayersList({ users }) {
  return (
    <TogglableCard header="pelaajat">
      <ul>
        {users.map((u, i) => (
          <li key={u + i} style={{ listStyle: 'none' }}>
            {u.name} - sanoja: {u.words.length}, pisteitä: {u.points}
          </li>
        ))}
      </ul>
    </TogglableCard>
  )
}
