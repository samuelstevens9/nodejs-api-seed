var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var router = express.Router();

var get_model_from_collection = function(collection){
  var model_name = collection.charAt(0).toUpperCase() + collection.slice(1);
  if(model_name.charAt(model_name.length-1) == 's'){
    model_name = model_name.slice(0,-1);
  }
  var model = mongoose.model(model_name)
  
  return model;
}

router.route('/:collection')

  .get(function(req,res){
    if(!req.user.admin) { res.json({}); return; }
    var model = get_model_from_collection(req.params.collection);
    model.find(function(err, m) {
      if (err){
          res.send('pp'+err);
          return;
      }
      res.json(m);
    });
  })
  .post(function(req, res) {
    if(!req.user.admin) { res.json({}); return; }
    var model = get_model_from_collection(req.params.collection);
    var m = new model(req.body);      // create a new instance of the User model
    
    m.save(function(err) {
        if (err){
          res.send(err);
          return;
        }
        var model_name = req.params.collection.charAt(0).toUpperCase() + req.params.collection.slice(1);
        var rj = {message: req.params.collection+' created!'}
        rj[req.params.collection] = m;
        res.json(rj);
    });
      
  })
  
;
router.route('/:collection/:_id')

  .get(function(req,res){
    if(!req.user.admin) { res.json({}); return; }
    var model = get_model_from_collection(req.params.collection);
    // use our model to find the one we want
    model.findById(req.params._id, function(err, m) {
      if (err){
        res.send(err);
        return;
      }
      return res.json(m);
      
    });
  })

;

module.exports = router;