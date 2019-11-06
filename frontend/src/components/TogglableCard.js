import React, { useState } from 'react'

import { Button, Card } from 'semantic-ui-react'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

export default function TogglableCard({header, children }) {
  const [show, setShow] = useState(true)
  return (
    <Card fluid>
      <Button size='mini' onClick={() => setShow(!show)}>
        {show ? <IoIosArrowUp /> : <IoIosArrowDown />} {header}
      </Button>
      {show && (
        children
      )}
    </Card>
  )
}
