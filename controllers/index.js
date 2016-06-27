
const test = require('./test');
const news = require('./news');

module.exports = function(app) {

    app.use('/', test);
    app.use('/', news);

    return function(req, res, next) {
        return next();
    };
};