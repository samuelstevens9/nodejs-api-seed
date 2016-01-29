require('./lib/connection');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var uuid = require('node-uuid');
var User = mongoose.model('User');
// create a sample user
var salt = bcrypt.genSaltSync(10);
var password = bcrypt.hashSync('password', salt);
var admin_u = new User({ 
  email: 'admin@myapp.com',
  first_name: 'Admin', 
  last_name: 'User',
  api_token: uuid.v4().replace(/-/g,'');,
	role: 'Global Admin',
  admin: true 
});
admin_u.save(function(err) {
  if (err){
    console.log(err);
  }else{
    console.log('admin_u saved successfully:',admin_u);
    process.exit();
  }
});