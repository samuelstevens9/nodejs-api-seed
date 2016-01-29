var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (io) {
  'use strict';
  io.on('connection', function (socket) {
    //TODO: check api_token
    console.log('connected from user',socket.handshake.query.user_id);
    socket.on('some-event', function (from, msg) {
      console.log('recieved message from', from, 'msg', JSON.stringify(msg));
 
      console.log('broadcasting message');
      console.log('payload is', msg);
      io.sockets.emit('broadcast-to_id', {
        payload: Math.random(),
        source: from
      });
      console.log('broadcast complete');
    });
  });
};
