import React from 'react'
import { Button } from 'semantic-ui-react'
import TogglableCard from './TogglableCard'

function MyWords({ words, removeWord }) {
  return (
    <TogglableCard header="minun sanat">
      minun sanat:
      <ul>
        {words.map((w, i) => (
          <li key={w.text + i} style={{ listStyle: 'none' }}>
            {w.text}
            <Button
              onClick={() => removeWord(w.text)}
              size="mini"
              color="red"
              style={{ margin: '5px' }}
              circular
              icon="delete"
            />
          </li>
        ))}
      </ul>
    </TogglableCard>
  )
}

export default MyWords
