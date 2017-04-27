/*
 * 2017 國民黨主席辯論直播
 */

import co from 'co';
const debug = require('debug')('NOWapis:controller:kmt:chairman2017');

const redis = require('../../redis');

module.exports = function(req, res, next) {

    co(function*() {

        return res.json({
            title: '直播 /「龍談大小事」- 國民黨準黨魁吳敦義直播專訪',
            teaserTitle: '19:00 「龍談大小事」- 國民黨準黨魁吳敦義直播專訪',
            url: 'https://www.youtube.com/embed/7CfgWE8f2rU',
            wowza: 'http://59.124.93.43/live/KMT.stream/playlist.m3u8?pf=mm',
            youtubeId: '7CfgWE8f2rU',
            livePage: 'http://dragon.nownews.com/',
            background: 'https://legacy.nownews.com/NOWnews_static/live-background.jpg',
            isOnAir: false,
            campainStatus: false
        });
    })
    .catch(next);
};