import React from 'react'

import { Menu, Button, Icon } from 'semantic-ui-react'

function Navbar({ user, handleLogout }) {
  return (
    <Menu>
      <Menu.Item>
        <Icon name="home" /> {user.roomName}
      </Menu.Item>
      <Menu.Item>
        <Icon name="user" /> {user.name}
      </Menu.Item>
      <Menu.Item>
        <Button onClick={handleLogout}>lopeta peli</Button>
      </Menu.Item>
    </Menu>
  )
}

export default Navbar
