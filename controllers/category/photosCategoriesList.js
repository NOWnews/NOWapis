import co from 'co';

const debug = require('debug')('NOWapis:controller:category:photosCategoryList');
const redis = require('../../redis');

module.exports = function(req, res, next) {

    co(function*() {

        let photosCategories = yield redis.getValue('photosCategories');
        debug('photosCategories = %j', photosCategories);

        return res.json(photosCategories);
    })
    .catch(next);
};