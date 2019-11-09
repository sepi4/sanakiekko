import React from 'react'

function Letters({ letters }) {
  const btnSize = 90 / letters.length
  const margin = 10 / (letters.length * 2)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '15px 0 0 0',
      }}
    >
      {letters.map((l, i) => (
        <div
          style={{
            width: `${btnSize}%`,
            height: 50,
            margin: `${margin}%`,
            background: '#dbdbdb',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            textAlign: 'center',
          }}
          key={'letter' + i}
        >
          <span
            style={{
              color: 'black',
              fontSize: '25px',
              fontWeight: 'bold',
              textAlign: 'center',
              margin: `${margin}%`,
            }}
          >
            {l}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Letters
