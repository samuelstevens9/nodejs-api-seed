var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  api_token: {
    type: String,
    required: true,
  },
  first_name: { type: String },
  last_name: { type: String },
	admin: { type: Boolean },
  role: { type: String },
  /*
  Global Admin
  Messenger
  */
  
  meta_data: {},
});

module.exports = mongoose.model('User', UserSchema);