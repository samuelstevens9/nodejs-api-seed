var express = require('./config/express');
require('./lib/connection');

var app = express();
var port = process.env.PORT || 5001;
//app.set('port', (process.env.PORT || 5001));

//app.use(express.static(__dirname + '/public'));

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.listen(port, function() {
    console.log('Node app is running on port', port);
});

module.exports = app;
