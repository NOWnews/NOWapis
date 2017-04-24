/*
 * 2017 國民黨主席辯論直播
 */

import co from 'co';
const debug = require('debug')('NOWapis:controller:kmt:chairman2017');

const redis = require('../../redis');

module.exports = function(req, res, next) {

    co(function*() {

        return res.json({
            title: '直播 /「龍談大小事」- 藍營準黨主席 PK',
            teaserTitle: '19:00 「龍談大小事」- 藍營準黨主席 PK',
            url: 'https://www.youtube.com/embed/CmprojsR_PM',
            wowza: 'http://59.124.93.43/live/KMT.stream/playlist.m3u8?pf=mm',
            youtubeId: 'CmprojsR_PM',
            livePage: 'https://m.nownews.com/live/CmprojsR_PM',
            background: 'http://legacy.nownews.com/NOWnews_static/live-background.jpg',
            isOnAir: false,
            campainStatus: true
        });
    })
    .catch(next);
};