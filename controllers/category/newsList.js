import co from 'co';

const debug = require('debug')('NOWapis:controller:category:newsList');
const redis = require('../../redis');

module.exports = function(req, res, next) {

    let categoryId = parseInt(req.params.nodeId, 10);

    co(function*() {

        let categoryNews = yield redis.getValue(`category${categoryId}`);
        debug('categoryNews = %j', categoryNews);

        return res.send(categoryNews);
    })
    .catch(next);
};