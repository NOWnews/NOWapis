
const test = require('./test');
const news = require('./news');
const channels = require('./channels');

module.exports = function(app) {

    app.use('/', test);
    app.use('/', news);
    app.use('/', channels);

    return function(req, res, next) {
        return next();
    };
};