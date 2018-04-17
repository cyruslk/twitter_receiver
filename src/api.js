import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 3000);
}

function changeTweetWidget(cb) {
  socket.on('sendNewTweet', tweet => cb(null, tweet));
  socket.emit('changeTweetWidget');
}

export { subscribeToTimer, changeTweetWidget };