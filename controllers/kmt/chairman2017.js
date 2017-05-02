/*
 * 2017 國民黨主席辯論直播
 */

import co from 'co';
const debug = require('debug')('NOWapis:controller:kmt:chairman2017');

const redis = require('../../redis');

module.exports = function(req, res, next) {

    co(function*() {

        return res.json({
            title: '5/4(四) 19:00收看「龍談大小事」， 唐湘龍潘維剛跟你面對面！',
            teaserTitle: '5/4(四) 19:00收看「龍談大小事」， 唐湘龍潘維剛跟你面對面！',
            url: 'https://www.youtube.com/embed/7CfgWE8f2rU',
            wowza: 'http://59.124.93.43/live/KMT.stream/playlist.m3u8?pf=mm',
            youtubeId: '7CfgWE8f2rU',
            livePage: 'http://dragon.nownews.com/',
            background: 'https://legacy.nownews.com/NOWnews_static/live-background.jpg',
            isOnAir: false,
            campainStatus: true
        });
    })
    .catch(next);
};