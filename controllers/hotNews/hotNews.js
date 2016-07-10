import co from 'co';

const debug = require('debug')('NOWapis:controller:hotNews');
const redis = require('../../redis');

module.exports = function(req, res, next) {

    co(function*() {

        let hotNews = yield redis.getValue('hotNews');
        debug('hotNews = %j', hotNews);

        return res.json(hotNews);
    })
    .catch(next);
};