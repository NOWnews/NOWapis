/*
 * 取得 ad2004 原生廣告內容
 */

import co from 'co';
import Promise from 'bluebird';
import request from 'request-promise';
import iconv from 'iconv-lite';
import _ from 'lodash';
import is from 'is_js';

module.exports = co.wrap(function*() {

    // 從 ad2004 取得 JSON
    let ads = yield [
        request('http://ad1.nownews.com/ads.php?ownerid=2995', { encoding: null, timeout: 5000 }),
        request('http://ad1.nownews.com/ads.php?ownerid=2996', { encoding: null, timeout: 5000 }),
        request('http://ad1.nownews.com/ads.php?ownerid=2997', { encoding: null, timeout: 5000 }),
        request('http://ad1.nownews.com/ads.php?ownerid=2998', { encoding: null, timeout: 5000 }),
        request('http://ad1.nownews.com/ads.php?ownerid=2999', { encoding: null, timeout: 5000 }),
        request('http://ad1.nownews.com/ads.php?ownerid=3000', { encoding: null, timeout: 5000 }),
        request('http://ad1.nownews.com/ads.php?ownerid=3001', { encoding: null, timeout: 5000 }),
    ];

    // 處理該死的 big5 編碼轉換
    ads = _.map(ads, (ad, idx) => {

        let adString = iconv.decode(new Buffer(ad), 'BIG5');

        let adjson = (adString === '') ? null : JSON.parse(adString);

        /* 原本的 code
        let adjson;

        if(ad && is.json(ad)) {
            adjson = JSON.parse(iconv.decode(new Buffer(ad), 'BIG5'));
        }

        if(ad && is.object(ad)) {
            adjson = JSON.parse(iconv.decode(ad, 'BIG5'));
        }

        adjson = (is.json(ad) || is.object(ad)) ? adjson : null;

         */

        return {
            sn: idx + 1,
            ad: adjson
        };
    });

    return Promise.resolve(ads);
});