
const test = require('./test');
const news = require('./news');
const channels = require('./channels');
const category = require('./category');

module.exports = function(app) {

    app.use('/', test);
    app.use('/', news);
    app.use('/', channels);
    app.use('/', category);

    return function(req, res, next) {
        return next();
    };
};