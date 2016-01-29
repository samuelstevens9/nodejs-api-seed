module.exports = function(app) {

    app.use('/api/authenticate',require('../controllers/authenticate.controller')(app));
    
    app.use('/api*', require('../controllers/api.controller')(app));
    app.use('/api/users',require('../controllers/users.controller'));
    //Add more routes here:
    
    //This is just a simple generic collection controller catch all
    app.use('/api/', require('../controllers/collection.controller'));
};
