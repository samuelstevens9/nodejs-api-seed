module.exports = function(app) {

    app.use('/api/authenticate',require('../controllers/authenticate.controller')(app));
    
    app.get('/api*', require('../controllers/api.controller')(app));
    app.use('/api/users',require('../controllers/users.controller'));
    
    app.use('/api/', require('../controllers/collection.controller'));
};
