import co from 'co';

const debug = require('debug')('NOWapis:controller:instant');
const redis = require('../../redis');

module.exports = function(req, res, next) {

    co(function*() {

        let instant = yield redis.getValue('instant');
        debug('instant = %j', instant);

        return res.json(instant);
    })
    .catch(next);
};