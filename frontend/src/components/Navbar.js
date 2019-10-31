import React from 'react'

import { Menu, Button } from 'semantic-ui-react'

function Navbar({ user, handleLogout }) {
  return (
    <Menu>
      <Menu.Item>huone: {user.room}</Menu.Item>
      <Menu.Item>käyttäjä: {user.name}</Menu.Item>
      <Menu.Item>
        <Button onClick={handleLogout}>kirjaudu ulos</Button>
      </Menu.Item>
    </Menu>
  )
}

export default Navbar
