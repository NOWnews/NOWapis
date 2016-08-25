import co from 'co';

const debug = require('debug')('NOWapis:controller:category:videosCategoryList');
const redis = require('../../redis');

module.exports = (req, res, next) => {

    co(function*() {

        let videosCategories = yield redis.getValue('videosCategories');
        debug('videosCategories = %j', videosCategories);

        return res.json(videosCategories);
    })
    .catch(next);
};