
const news = require('./news');
const photos = require('./photos');
const videos = require('./videos');
const channels = require('./channels');
const category = require('./category');
const headline = require('./headline');
const hotNews = require('./hotNews');
const instant = require('./instant');
const search = require('./search');
const sitemap = require('./sitemap');
const check = require('./check');
const nearByNews = require('./nearByNews');
const csmuse = require('./csmuse');

module.exports = function(app) {

    app.use('/', channels);
    app.use('/', category);
    app.use('/', headline);
    app.use('/', hotNews);
    app.use('/', instant);
    app.use('/', news);
    app.use('/', photos);
    app.use('/', videos);
    app.use('/', search);
    app.use('/', sitemap);
    app.use('/', check);
    app.use('/', nearByNews);
    app.use('/', csmuse);

    return function(req, res, next) {
        return next();
    };
};
