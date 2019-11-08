import React, { useState } from 'react'

// import { Card } from 'semantic-ui-react'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

export default function TogglableCard({ header, children }) {
  const [show, setShow] = useState(true)
  return (
    <div fluid="true">
      <div
        style={{
          textAlign: 'center',
          cursor: 'pointer',
          background: `linear-gradient(180deg, 
            rgba(219,219,219,1) 0%, 
            rgba(255,255,255,1) 100%)`,
          margin: 5
        }}
        size="mini"
        onClick={() => setShow(!show)}
      >
        <span style={{ fontWeight: 'bold' }}>
          {show ? <IoIosArrowUp /> : <IoIosArrowDown />} {header}
        </span>
      </div>
      {show && children}
    </div>
  )
}
