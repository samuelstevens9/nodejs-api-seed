require('./lib/connection');
var mongoose = require('mongoose');

var User = mongoose.model('User');
// create a sample user
var admin_u = new User({ 
  email: 'admin@admin.com',
  first_name: 'Admin', 
  last_name: 'User',
  password: 'password',
  admin: true 
});
admin_u.save(function(err) {
  if (err)
    console.log(err)
  else
    console.log('admin_u saved successfully');
});
