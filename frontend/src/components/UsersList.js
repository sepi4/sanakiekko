import React, { 
  useState, 
  useEffect, 
  useLayoutEffect,
} from 'react'

function UsersList({ socket }) {
  const [users, setUsers] = useState([])


  // console.log(new Date().getTime())

  // socket.on('allUsers', (users) => {
  //   setUsers(users)
  // })

  useEffect(() => {
  // useLayoutEffect(() => {
    console.log('useEffect')

    socket.on('allUsers', (users) => {
      console.log('allUsers')
      setUsers(users)
    })
    // socket.emit('loadAllUsers')

    return () => {
      socket.off('allUsers')
    }
  }, [socket])

  useEffect(() => {
    console.log(socket.id)
    socket.emit('loadAllUsers', (users) => {
      console.log('loadAllUsers callback')
      setUsers(users)
    })
  }, [socket])

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
//     console.log(new Date().getTime())
//     // setTimeout(()=> {
//       this.props.socket.on('allUsers', (users) => {
//         // users = users.map(u => <li key={u.socketId}>{u.name}</li>)
//         this.setState({
//           users
//         })
//       })
//     // }, 1)
//   }

//   componentWillUnmount() {
//     this.props.socket.off('allUsers')
//   }

//   render() {
//     return (
//       <ul>
//         {this.state.users.map(u => <li key={u.socketId}>{u.name}</li>)}
//       </ul>
//     )
//   }
// }

export default UsersList
