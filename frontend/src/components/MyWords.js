import React from 'react'
import { Button } from 'semantic-ui-react'

function MyWords({ words, removeWord }) {
  return (
    <div>
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
              icon='delete'
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MyWords
