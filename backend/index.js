const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')

const port = process.env.PORT || 1111
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', socket => {
  console.log('connection', socket.id)
  socket.on('join', () => {

  })
})

server.listen(port, () => {
  console.log(`Started server at port ${port}!`)
})

