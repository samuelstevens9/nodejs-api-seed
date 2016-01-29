var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var User = mongoose.model('User');

var router = express.Router();

module.exports = function(app){
  
  router.post('/',function(req,res){
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
        // Load hash from your password DB.
        // check if password matches bcrypt.compareSync("B4c0/\/", hash);
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          // if user is found and password is right
          // create a token
          //TODO: user.toObject() will actually set the token expiration, user will not; for testing no expiration
          var token = jwt.sign({_id:user._id}, app.get('superSecret'), {
            //expiresIn: 7*24*60*60 // expires in 24 hours
          });
          
          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            user: user.toObject()
          });
        }   

      }

    });
  });
  
  return router;
  
}