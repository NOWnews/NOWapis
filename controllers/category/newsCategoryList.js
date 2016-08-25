import co from 'co';

const debug = require('debug')('NOWapis:controller:category:newsCategorylist');
const redis = require('../../redis');

module.exports = function(req, res, next) {

    co(function*() {

        let categories = yield redis.getValue('categories');
        debug('categories = %j', categories);

        return res.json(categories);
    })
    .catch(next);
};