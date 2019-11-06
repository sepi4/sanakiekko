import React from 'react'

import { Button } from 'semantic-ui-react'

function Letters({ letters }) {
  const btnSize = 90 / letters.length
  const margin = 10 / (letters.length * 2)

  return (
    <div style={{ margin: '15px 0 0 0' }}>
      {letters.map((l, i) => (
        <Button
          style={{
            width: `${btnSize}%`,
            height: `${btnSize}%`,
            margin: `${margin}%`,
          }}
          color="pink"
          key={'letter' + i}
        >
          <span
            style={{
              color: 'black',
              fontSize: '20px',
              textAlign: 'center',
              margin: `${margin}%`,
            }}
          >
            {l}
          </span>
        </Button>
      ))}
    </div>
  )
}

export default Letters
