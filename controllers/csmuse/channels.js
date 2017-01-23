
import co from 'co';
const debug = require('debug')('NOWapis:controller:csmuse:channels');

const redis = require('../../redis');

module.exports = function(req, res, next) {

    co(function*() {

        let channels = yield redis.getValue('csmuseChannels');
        debug('channels = %j', channels);

        return res.json(channels);
    })
    .catch(next);
};