const debug = require('debug')('NOWapis:controller:check');

module.exports = (req, res, next) => {
    return res.send('api still alive :)');
};