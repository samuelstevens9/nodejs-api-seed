var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var User = mongoose.model('User');

var router = express.Router();

router.route('/')

.get(function(req,res){
  if(req.user.admin){
    var query = {};
    for(var q in req.query){
      if(req.query[q]){//assume null is not?
        query[q] = req.query[q];
      }
    }
    
    User.find(query,{api_token: 0}).sort({last_name:1,first_name:1}).exec(function(err, users){
      if(err) {
        res.send(err);
        return;
      }
      res.json(users);
    });
  }else{
    res.send('');
  }

})

.post(function(req, res) {
  if(req.user.admin){
    //only admin, so let's cheat since it's mongo and user the req.body
    var user = new User(req.body);
    /*
    for(var attr in req.body){
      if(user.hasOwnProperty(attr)){
        user[attr]
      }
    }
    user._id = req.body._id;
    user.email = req.body.email;  
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    //bcrypt password
    var salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(req.body.password, salt);
    req.body.role;
    */
    user.admin = false;
    user.role = 'Messenger';
    // save and check for errors
    user.save(function(err) {
        if (err){
          res.json({result:'error',message:err});
          return;
        }
        res.json({ message: 'User created!', user:user });
    });
  }else{
    res.json(""); //just return the decoded user
  }
});


router.route('/:user_id')

  .get(function(req,res){
    if(req.user.admin){
      User.findById(req.params.user_id,{api_token: 0}, function(err, user){
        if(err){
           res.send(err);
           return;
         }
        
        res.json(user);
        
        
      });
    }else{
      res.json(""); //just return the decoded user
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
          for(var attr in req.body){
            if(user.hasOwnProperty(attr)){
              user[attr] = req.body[attr];
            }
          }
          user.admin = false;
          user.role = 'Messenger';
          
          // save the user
          user.save(function(err) {
              if (err){
                  res.send(err);
              }
              res.json({ message: 'User updated!', user:user });
          });
        });
      }else{
        res.json(""); //just return the decoded user
      }
    });

module.exports = router;