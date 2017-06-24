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
        // return res.json({
        //     title: '就是現在！「龍談大小事」 唐湘龍獨家專訪洪秀柱',
        //     teaserTitle: '就是今晚 19:00！「龍談大小事」 唐湘龍獨家專訪洪秀柱',
        //     banner: 'http://legacy.nownews.com/NOWnews_static/live-banner.jpg',
        //     alt: '「龍談大小事」 唐湘龍獨家專訪洪秀柱',
        //     url: 'https://www.youtube.com/embed/bI9fwUCGFKM',
        //     wowza: 'http://59.124.93.43/live/music.stream/playlist.m3u8?pf=mm',
        //     youtubeId: 'bI9fwUCGFKM',
        //     livePage: 'http://dragon.nownews.com/',
        //     background: 'https://legacy.nownews.com/NOWnews_static/live-background.jpg',
        //     backgroundColor: '#403534',
        //     redirect: 'http://dragon.nownews.com/',
        //     isOnAir: false,
        //     campainStatus: false
        // });

        // 金曲
        return res.json({
            title: '第28屆金曲獎頒獎典禮紅毯 ！#NOW直擊 媒體採訪區',
            teaserTitle: '第28屆金曲獎頒獎典禮紅毯 ！#NOW直擊 媒體採訪區',
            banner: 'http://legacy.nownews.com/NOWnews_static/live-banner.jpg',
            alt: '第28屆金曲獎頒獎典禮紅毯 ！#NOW直擊 媒體採訪區',
            url: 'https://www.youtube.com/embed/rqESGX2vt3M',
            wowza: '',
            youtubeId: 'rqESGX2vt3M',
            livePage: 'https://m.nownews.com/live/rqESGX2vt3M',
            background: 'https://legacy.nownews.com/NOWnews_static/live-background.jpg',
            backgroundColor: '#403534',
            redirect: '',
            isOnAir: false,
            campainStatus: false
        });
    })
    .catch(next);
};