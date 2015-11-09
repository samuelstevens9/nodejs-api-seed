var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var router = express.Router();

router.route('/')

  .get(function(req,res){
    if(req.user.admin){
      User.find(function(err, users){
        if(err) {
          res.send(err);
          return;
        }
        res.json(users);
      });
    }else{
      res.json(req.user); //just return the decoded user
    }
  })
  
  .post(function(req, res) {
      if(req.user.admin){
        var user = new User();      // create a new instance of the User model
        user.email = req.body.email;  
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.password = req.body.password;
        user.admin = false;

        // save and check for errors
        user.save(function(err) {
            if (err){
              res.send(err);
              return;
            }
            res.json({ message: 'User created!', user:user });
        });
      }else{
        res.json(req.user); //just return the decoded user
      }
    });
  
router.route('/:user_id')

  .get(function(req,res){
    if(req.user.admin){
      User.findById(req.params.user_id, function(err, user){
        if(err) res.send(err);
        
        res.json(user);
      });
    }else{
      res.json(req.user); //just return the decoded user
    }
  })
  
  .put(function(req, res) {
    if(req.user.admin){
        // use our model to find the one we want
        User.findById(req.params.user_id, function(err, user) {

          if (err){
            res.send(err);
            return;
          }

          user.email = req.body.email;  
          user.first_name = req.body.first_name;
          user.last_name = req.body.last_name;
          

          // save the user
          user.save(function(err) {
              if (err)
                  res.send(err);

              res.json({ message: 'User updated!', user:user });
          });

        });
      }else{
        res.json(req.user); //just return the decoded user
      }
    });

module.exports = router;