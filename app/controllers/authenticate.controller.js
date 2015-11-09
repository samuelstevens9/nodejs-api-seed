var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = mongoose.model('User');

var router = express.Router();

module.exports = function(app){
  
  router.post('/',function(req,res){
    console.log(req.body);
    // find the user
    User.findOne({
      email: req.body.email
    }, function(err, user) {

      if (err){
        res.json({ success: false, message: 'Authentication failed.' });
        return;
      }

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        // check if password matches
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, app.get('superSecret'), {
            expiresIn: 24*60*60 // expires in 24 hours
          });
          
          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }   

      }

    });
  });

  return router;
  
}