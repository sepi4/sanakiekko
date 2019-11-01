// const arrUsers = [
//   {
//     name: 'kissa',
//     room: 'huone',
//   },
//   {
//     name: 'koira',
//     room: 'koti',
//   },
//   {
//     name: 'apina',
//     room: 'huone',
//   },
//   {
//     name: 'sika',
//     room: 'kanala',
//   },
//   {
//     name: 'kana',
//     room: 'kanala',
//   },
//   {
//     name: 'lammas',
//     room: 'huone',
//   },
//   {
//     name: 'hevonen',
//     room: 'huone',
//   },
// ]
// console.log(typeof arrUsers)


export const toRoomsAndNames = (arr) => {
  let rooms = []
  for (let u of arr) {
    if (rooms[u.room]) {
      rooms[u.room].push(u)
    }
    else {
      rooms[u.room] = []
      rooms[u.room].push(u)
    }
  }
  return rooms
}
