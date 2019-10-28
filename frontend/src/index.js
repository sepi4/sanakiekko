import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import io from 'socket.io-client'
const socket = io("http://127.0.0.1:1111")

ReactDOM.render(<App socket={socket} />, document.getElementById('root'));
