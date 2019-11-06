import React from 'react'

import { FaBackspace } from 'react-icons/fa'

import { Button, Header } from 'semantic-ui-react'

function Letters({ letters }) {
  return (
    <div>
      <div>
        {letters.map((l, i) => (
          <Button color="olive" key={'letter' + i}>
            <Header as="h2">{l}</Header>
            {/* <h2>{l}</h2> */}
          </Button>
        ))}
      </div>
      <Button color="black">
        <FaBackspace />
      </Button>
    </div>
  )
}

export default Letters
