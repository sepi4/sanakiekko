import React from 'react'

import { Button, Header } from 'semantic-ui-react'


function Letters({ letters }) {
  return (
    <div>
      {letters.map((l, i) => (
        <Button color="olive" key={'letter' + i}>
          <Header as="h1">{l}</Header>
        </Button>
      ))}
    </div>
  )
}

export default Letters
