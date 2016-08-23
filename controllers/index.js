
const news = require('./news');
const channels = require('./channels');
const category = require('./category');
const headline = require('./headline');
const hotNews = require('./hotNews');
const instant = require('./instant');

module.exports = function(app) {

    app.use('/', channels);
    app.use('/', category);
    app.use('/', headline);
    app.use('/', hotNews);
    app.use('/', instant);
    app.use('/', news);

    return function(req, res, next) {
        return next();
    };
};
