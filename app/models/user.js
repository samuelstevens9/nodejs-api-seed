var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  first_name: { type: String },
  last_name: { type: String },
  api_token: String,
	admin: { type: Boolean },
  role: { type: String },
  
});

module.exports = mongoose.model('User', UserSchema);