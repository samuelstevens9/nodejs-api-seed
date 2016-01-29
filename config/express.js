var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cors = require('cors');

module.exports = function() {
  var app = express();
  var http = require('http').Server(app);
  //var io = require('socket.io')(http);
  //Socket.IO
  //console.log("Socket.io Server listening");// + appPort);
  //require('../app/sockets/socket')(io);
  app.use(cors());//enable CORS for ALL routs
  app.set('superSecret', '$$$$$$$hhh itsa 53cr3t!'); // secret variable
  // configure app to use bodyParser()
  // this will let us get the data from a POST
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  

  
  // use morgan to log requests to the console
  app.use(morgan('dev'));
  
  require('../app/routes/api.routes.js')(app);
  return http;
};
