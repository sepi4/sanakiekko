import React, { useState } from 'react'

import { Card } from 'semantic-ui-react'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

export default function TogglableCard({ header, children }) {
  const [show, setShow] = useState(true)
  return (
    <Card fluid>
      <div
        style={{
          textAlign: 'center',
          cursor: 'pointer',
          background: 'linear-gradient(180deg, rgba(219,219,219,1) 0%, rgba(255,255,255,1) 100%)',
        }}
        size="mini"
        onClick={() => setShow(!show)}
      >
        {show ? <IoIosArrowUp /> : <IoIosArrowDown />} {header}
      </div>
      {show && children}
    </Card>
  )
}
