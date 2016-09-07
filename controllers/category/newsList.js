import co from 'co';
import Promise from 'bluebird';
import _ from 'lodash';
import moment from 'moment-timezone';
import request from 'request-promise';

const debug = require('debug')('NOWapis:controller:category:newsList');
const redis = require('../../redis');
const libs = require('../../libs');

module.exports = function(req, res, next) {

    let { taxId } = req.params;
    let { limit, skip, page } = req.query;
    let now = parseInt(moment(Date.now()).format('X'), 10);

    debug('taxId = %s', taxId);

    co(function*() {

        // 去跟 redis 要資料，有資料直接 response
        if(page === 1) {
            let redisCategoryNews = yield redis.getValue(`category${taxId}`);
            debug('redisCategoryNews = %j', redisCategoryNews);
            if(redisCategoryNews && redisCategoryNews.length !== 0) {
                return res.json(redisCategoryNews);
            }
        }

        // 如果沒有資料就進去 db 撈，並且 cache 起來
        let mongodb14 = yield require('../../mongodb14');

        // 找出某個分類的新聞
        let categoryNews = yield mongodb14.collection('fields_current.node').find({
           _bundle: 'news',
           _type: 'node',
           'field_release_status.value': 1,
           'field_release_date.value': { $lte: now },
           'field_main_category.tid': parseInt(taxId, 10)
        }, {
            _id: 1,
            title: 1,
            created: 1,
            field_main_category: 1,
            field_release_date: 1,
            field_short_title: 1
        })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ 'field_release_date.value': -1 })
        .toArrayAsync();

        // 找出圖片
        let newsData = yield Promise.map(categoryNews, function(news) {
            return libs.getImageFromNews(news);
        });

        // 找尋新聞分類
        yield Promise.map(newsData, function(news) {
            return libs.findNewsMainCategory(news);
        });

        // 時間正規化
        _.map(newsData, function(news) {
            news.createdAt = moment(news.field_release_date.value * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss');
        });

        // 尋找 ad2004 原生廣告
        // let options = {
        //     uri: `http://ad1.nownews.com/ads.php`,
        //     qs: {

        //         q: decodeURI(keyword),
        //         fq: 'bundle:news',
        //         start: offset,
        //         rows: limit,
        //         fl: 'entity_id',
        //         wt: 'json',
        //         explainOther: '',
        //         'hl.fl': 0,
        //         sort: 'its_field_release_date desc'
        //     },
        //     json: true
        // };

        let ads = yield [
            request('http://ad1.nownews.com/ads.php?ownerid=2995', { json: true }),
            request('http://ad1.nownews.com/ads.php?ownerid=2995', { json: true }),
            request('http://ad1.nownews.com/ads.php?ownerid=2995', { json: true }),
            request('http://ad1.nownews.com/ads.php?ownerid=2995', { json: true }),
            request('http://ad1.nownews.com/ads.php?ownerid=2995', { json: true }),
            request('http://ad1.nownews.com/ads.php?ownerid=2995', { json: true }),
            request('http://ad1.nownews.com/ads.php?ownerid=2995', { json: true }),
            // request('http://ad1.nownews.com/ads.php?ownerid=2996', { json: true }),
            // request('http://ad1.nownews.com/ads.php?ownerid=2997', { json: true }),
            // request('http://ad1.nownews.com/ads.php?ownerid=2998', { json: true }),
            // request('http://ad1.nownews.com/ads.php?ownerid=2999', { json: true }),
            // request('http://ad1.nownews.com/ads.php?ownerid=3000', { json: true }),
            // request('http://ad1.nownews.com/ads.php?ownerid=3001', { json: true }),
        ];

        ads = _.map(ads, (ad, idx) => {
            return {
                sn: idx + 1,
                ad: ad || null
            };
        });

        // 把資料存入 redis
        if(page === 1) {
            yield redis.setValue(`category${taxId}`, {
                newsList: newsData,
                ads: ads
            }, 180);
        }

        return res.send({
            newsList: newsData,
            ads: ads
        });
    })
    .catch(next);
};