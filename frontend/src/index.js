import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router } from 'react-router-dom'

import io from 'socket.io-client'
const socket = io('http://127.0.0.1:1111')
// console.log(new Date().getTime())

ReactDOM.render(
  <Router>
    <App socket={socket} />
  </Router>,
  document.getElementById('root'),
)
