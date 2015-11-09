var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cors = require('cors');

module.exports = function() {
  var app = express();
  app.use(cors());//enable CORS for ALL routs
  app.set('superSecret', 'super secret string for jsonwebtoken'); // secret variable
  // configure app to use bodyParser()
  // this will let us get the data from a POST
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // use morgan to log requests to the console
  app.use(morgan('dev'));
  
  require('../app/routes/api.routes.js')(app);
  return app;
};
