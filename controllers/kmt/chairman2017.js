/*
 * 2017 國民黨主席辯論直播
 */

import co from 'co';
const debug = require('debug')('NOWapis:controller:kmt:chairman2017');

const redis = require('../../redis');

module.exports = function(req, res, next) {

    co(function*() {

        return res.json({
            title: '2017 國民黨黨主席辯論直播',
            url: 'https://www.youtube.com/embed/KyrppX4KFH4',
            youtubeId: 'KyrppX4KFH4',
            livePage: 'https://m.nownews.com/live/KyrppX4KFH4',
            background: 'http://legacy.nownews.com/NOWnews_static/live-background.jpg',
            isOnAir: false,
            campainStatus: false
        });
    })
    .catch(next);
};