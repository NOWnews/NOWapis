
const test = require('./test');

module.exports = function(app) {

    app.use('/', test);

    return function(req, res, next) {
        return next();
    };
};