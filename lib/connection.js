var mongoose = require('mongoose');
var dbUrl = process.env.MONGO_URL || 'mongodb://localhost/nodejs-api-starter';
if(process.env.ENV && process.env.ENV == 'production'){
	dbUrl = process.env.MONGO_URL;
}
console.log('MongoDB: '+dbUrl);

try {
	mongoose.connect(dbUrl);
	console.log('connected');
	// Close the Mongoose connection on Control+C
	process.on('SIGINT', function() {
	  mongoose.connection.close(function () {
	    console.log('Mongoose default connection disconnected');
	    process.exit(0);
	}); });
	require('../app/models/user');
	//TODO: require other models here
  
	console.log('loaded schema models');
} catch (err) {
	console.log("could not connect to MongoDB, "+dbUrl,err);
}
