import React, { useState, useEffect } from 'react'

function UsersList({ socket }) {
  const [users, setUsers] = useState([])

  console.log('UsersList socket', socket)

  useEffect(() => {
    console.log('useEffect')
    socket.on('allUsers', (users) => {
      setUsers(users)
    })
    return () => {
      socket.off('allUsers')
    }
  },[socket])

  return (
    <ul>
      {users.map(u => <li key={u.socketId}>{u.name}</li>)}
    </ul>
  )
}

// class UsersList extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       users: []
//     }
//   }

//   componentDidMount() {
//     this.props.socket.on('allUsers', (users) => {
//       users = users.map(u => <li key={u.socketId}>{u.name}</li>)
//       this.setState({
//         users
//       })
//     })
//   }
//   componentWillUnmount() {
//     this.props.socket.off('allUsers')
//   }

//   render() {
//     return (
//       <ul>
//         {this.state.users}
//       </ul>
//     )
//   }
// }

export default UsersList
