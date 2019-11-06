import React, { useState, useEffect } from 'react'
import { MdShortText } from 'react-icons/md'

export default function Checking({ socket, user }) {
  const [room, setRoom] = useState(null)
  useEffect(() => {
    let mounted = true
    socket.emit('getRoomsInfo', user.roomName, rooms => {
      const room = rooms.find(r => r.roomName === user.roomName)
      if (mounted) setRoom(room)
    })
    return () => {
      mounted = false
    }
  })

  return (
    <div>
      <h3>Tarkistus</h3>
      <ul>
        {room &&
          room.users.map(u => (
            <li key={u.name} style={{ listStyle: 'none' }}>
              {u.name}
              <ul>
                {u.words.map(w => (
                  <li key={w.text} style={{ listStyle: 'none' }}>
                    <MdShortText />{w.text}
                    <input
                      type="checkbox"
                      onClick={e => {
                        //TODO toggle tarvitsee kunnon callbaking
                        socket.emit('toggleWord', {
                          user: u,
                          word: w,
                        })
                      }}
                      value={w.usersAccepted.find(id => id === user.id)}
                    />
                    {w.usersAccepted.length}/{room.users.length}
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  )
}
