import co from 'co';

const debug = require('debug')('NOWapis:controller:channels:menu');

const redis = require('../../redis');

module.exports = function(req, res, next) {

    co(function*() {

        let menu = yield redis.getValue('channelsMenu');
        debug('menu = %j', menu);

        return res.json(menu);
    })
    .catch(next);
};