var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = mongoose.model('User');

var router = express.Router();

module.exports = function(app){
  router.use(function(req, res, next){
    // check header or url parameters or post parameters for token
    var token = req.body.api_token || req.query.api_token || req.headers['x-api-token'];
    //var token = req.body.access_token || req.query.access_token || req.headers['x-access-token'];
    console.log('api.controller');
    // decode token
    if (token) {
      //If they have a valid access token...
      User.findOne({api_token:token},function(uer,user){
        if(uer || !user){
          return res.status(403).send({sucess:false,message:"Failed to authenticate token."});
        }
        console.log('found user',user.first_name);
        req.user = user;
        next();
      });
      
      /*
      //Use this if they are using x-access-token
      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
        if (err) {
          console.log('token expired');
          return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          //query the db for user info? might be slow if every req; save the exp date?
          User.findById(decoded._id,function(uer,user){
            if(uer || !user){
              console.log('no find user');
              return res.status(403).send({ success: false, message: 'User does not exist.' });    
            }
            console.log('token decoded');
            req.user = user; //this is a json user object    
            next();
          })
          
        }
      });
      */
    } else {
      console.log('NO TOKEN');  
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
      
    }

    
  });


  return router;

}
