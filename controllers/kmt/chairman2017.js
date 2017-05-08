/*
 * 2017 國民黨主席辯論直播
 */

import co from 'co';
const debug = require('debug')('NOWapis:controller:kmt:chairman2017');

const redis = require('../../redis');

module.exports = function(req, res, next) {

    co(function*() {

        // 龍談大小事直撥
        // return res.json({
        //     title: '5/4(四) 19:00收看「龍談大小事」， 唐湘龍潘維剛跟你面對面！',
        //     teaserTitle: '5/4(四) 19:00收看「龍談大小事」， 唐湘龍潘維剛跟你面對面！',
        //     banner: 'http://legacy.nownews.com/NOWnews_static/live-banner.jpg',
        //     alt: '黨主席選前直播',
        //     url: 'https://www.youtube.com/embed/i7bPBqCZ6As',
        //     wowza: 'http://59.124.93.43/live/KMT.stream/playlist.m3u8?pf=mm',
        //     youtubeId: 'i7bPBqCZ6As',
        //     livePage: 'http://dragon.nownews.com/',
        //     background: 'https://legacy.nownews.com/NOWnews_static/live-background.jpg',
        //     redirect: 'http://dragon.nownews.com/',
        //     isOnAir: false,
        //     campainStatus: false
        // });

        // 音樂會
        return res.json({
            title: '今天晚上19:30 NOWnews線上直播「美麗的聲音」音樂會',
            teaserTitle: '今天晚上19:30 NOWnews線上直播「美麗的聲音」音樂會',
            banner: 'http://legacy.nownews.com/NOWnews_static/1200x720%E4%BD%9B%E6%95%992.jpg',
            alt: '「美麗的聲音」慶佛誕音樂會',
            url: 'https://www.youtube.com/embed/xdn6qQPS6oM',
            wowza: 'http://59.124.93.43/live/music.stream/playlist.m3u8?pf=mm',
            youtubeId: 'xdn6qQPS6oM',
            livePage: '',
            background: 'https://legacy.nownews.com/NOWnews_static/live-background.jpg',
            redirect: '',
            isOnAir: true,
            campainStatus: true
        });
    })
    .catch(next);
};