
import co from 'co';
const debug = require('debug')('NOWapis:controller:lifefei:channels');

import { Address6 } from 'ip-address';
import request from 'request-promise';

const redis = require('../../redis');

module.exports = function(req, res, next) {
    co(function*() {

        let isMember = req.body.isMember === 'true' ? true : false;

        /*
         * 處理 ip，那個 'x-real-ip' 不知道是哪個該死的設定在 nginx 裡面取代 remote address
         */
        let ipString = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let isIPV6 = new Address6(ipString);
        if(isIPV6.isValid()) {
            ipString = isIPV6.to4().address;
        }

        // 拿 ip 去跟防盜連做註冊
        let { johncena } = yield request(`http://61.67.121.80:10011/api/wowza/register?ip=${ipString}`, {json: true});

        // 綜合娛樂
        let entertainments = [{
            SN: '',
            code: '',
            title: '民視',
            path: `http://59.124.93.43:1935/live/nns153.stream/playlist.m3u8?johncena=${johncena}`
        }, {
            SN: '',
            code: '',
            title: '台視',
            path: `http://59.124.93.43:1935/live/nns201.stream/playlist.m3u8?johncena=${johncena}`
        }, {
            SN: '',
            code: '',
            title: '中視',
            path: `http://59.124.93.43:1935/live/nns202.stream/playlist.m3u8?johncena=${johncena}`
        }, {
            SN: '',
            code: '',
            title: '華視',
            path: `http://59.124.93.43:1935/live/nns203.stream/playlist.m3u8?johncena=${johncena}`
        }, {
            SN: '',
            code: '',
            title: '緯來綜合台',
            path: `http://59.124.93.43:1935/live/nns213.stream/playlist.m3u8?johncena=${johncena}`
        }, {
        //     SN: '',
        //     code: '',
        //     title: '三立台灣台',
        //     path: `http://59.124.93.43:1935/live/nns216.stream/playlist.m3u8?johncena=${johncena}`
        // }, {
        //     SN: '',
        //     code: '',
        //     title: '三立都會台',
        //     path: `http://59.124.93.43:1935/live/nns185.stream/playlist.m3u8?johncena=${johncena}`
        // }, {
            SN: '',
            code: '',
            title: 'TVBS歡樂台',
            path: `http://59.124.93.43:1935/live/nns193.stream/playlist.m3u8?johncena=${johncena}`
        }];

        // 兒少動漫
        let animes = [{
            SN: '',
            code: '',
            title: '卡通頻道',
            path: `http://59.124.93.43:1935/live/nns209.stream/playlist.m3u8?johncena=${johncena}`
        }, {
            SN: '',
            code: '',
            title: '迪士尼頻道',
            path: `http://59.124.93.43:1935/live/nns210.stream/playlist.m3u8?johncena=${johncena}`
        }, {
            SN: '',
            code: '',
            title: 'MOMO親子台',
            path: `http://59.124.93.43:1935/live/nns211.stream/playlist.m3u8?johncena=${johncena}`
        }];
        // , {
        //     SN: '',
        //     code: '',
        //     title: '東森幼幼台',
        //     path: `http://59.124.93.43:1935/live/nns212.stream/playlist.m3u8?johncena=${johncena}`
        // }];

        // 新聞資訊
        let news = [
        // {
        //     SN: '',
        //     code: '',
        //     title: '東森新聞台',
        //     path: `http://59.124.93.43:1935/live/nns197.stream/playlist.m3u8?johncena=${johncena}`
        // },
        {
            SN: '',
            code: '',
            title: '中天新聞台',
            path: `http://59.124.93.43:1935/live/nns198.stream/playlist.m3u8?johncena=${johncena}`
        }, {
            SN: '',
            code: '',
            title: '民視新聞台',
            path: `http://59.124.93.43:1935/live/nns199.stream/playlist.m3u8?johncena=${johncena}`
        // }, {
        //     SN: '',
        //     code: '',
        //     title: '三立新聞台',
        //     path: `http://59.124.93.43:1935/live/nns200.stream/playlist.m3u8?johncena=${johncena}`
        }, {
            SN: '',
            code: '',
            title: 'TVBS新聞台',
            path: `http://59.124.93.43:1935/live/nns169.stream/playlist.m3u8?johncena=${johncena}`
        }, {
            SN: '',
            code: '',
            title: 'TVBS',
            path: `http://59.124.93.43:1935/live/nns170.stream/playlist.m3u8?johncena=${johncena}`
        },
        //  {
        //     SN: '',
        //     code: '',
        //     title: '東森財經新聞台',
        //     path: `http://59.124.93.43:1935/live/nns171.stream/playlist.m3u8?johncena=${johncena}`
        // },
        {
            SN: '',
            code: '',
            title: '非凡新聞台',
            path: `http://59.124.93.43:1935/live/nns172.stream/playlist.m3u8?johncena=${johncena}`
        }];

        // 戲劇電影
        let dramas = [{
            SN: '',
            code: '',
            title: '衛視電影台',
            path: `http://59.124.93.43:1935/live/nns173.stream/playlist.m3u8?johncena=${johncena}`
        }, {
            SN: '',
            code: '',
            title: '衛視洋片台',
            path: `http://59.124.93.43:1935/live/nns179.stream/playlist.m3u8?johncena=${johncena}`
        }];

        // 專業體育
        let sports = [{
            SN: '',
            code: '',
            title: '緯來育樂',
            path: `http://59.124.93.43:1935/live/nns206.stream/playlist.m3u8?johncena=${johncena}`
        }, {
            SN: '',
            code: '',
            title: '緯來體育台',
            path: `http://59.124.93.43:1935/live/nns181.stream/playlist.m3u8?johncena=${johncena}`
        }, {
            SN: '',
            code: '',
            title: 'FOX SPORTS',
            path: `http://59.124.93.43:1935/live/nns182.stream/playlist.m3u8?johncena=${johncena}`
        }, {
            SN: '',
            code: '',
            title: 'FOX SPORTS2',
            path: `http://59.124.93.43:1935/live/nns183.stream/playlist.m3u8?johncena=${johncena}`
        }];

        return res.json({
            liveInfo: {
                watchTime: 20,
                lockTime: 30,
                watchable: true,
                icon: 'http://legacy.nownews.com/NOWnews_static/lifefei.png',
                titleMessage: '本直播由飛常視界APP提供精彩試看\n請密切關注飛常視界的開放下載通知！\n\n飛常視界是台灣國際多媒體\n所屬之視頻服務',
                downloadable: false,
                iosDownloadLink: '',
                androidDownloadLink: ''
            },
            data: [
                {
                    categoryName: '綜合娛樂',
                    count: entertainments.length,
                    list: entertainments
                },
                {
                    categoryName: '兒少動漫',
                    count: animes.length,
                    list: animes
                },
                {
                    categoryName: '新聞資訊',
                    count: news.length,
                    list: news
                },
                {
                    categoryName: '戲劇電影',
                    count: dramas.length,
                    list: dramas
                },
                {
                    categoryName: '專業體育',
                    count: sports.length,
                    list: sports
                }
            ]
        });
    })
    .catch(next);
};
