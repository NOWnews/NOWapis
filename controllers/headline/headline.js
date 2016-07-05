import co from 'co';

const debug = require('debug')('NOWapis:controller:channels:menu');
const redis = require('../../redis');

module.exports = function(req, res, next) {

    co(function*() {

        let headline = yield redis.getValue('headline');
        debug('headline = %j', headline);

        return res.json(headline);
    })
    .catch(next);
};