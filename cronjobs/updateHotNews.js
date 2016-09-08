
import co from 'co';
import Promise from 'bluebird';
// import mongodb from 'mongodb';
import _ from 'lodash';
import moment from 'moment-timezone';
import request from 'request-promise';
import iconv from 'iconv-lite';

const debug = require('debug')('NOWapis:cronjobs:updateHotNews');
// const config = require('../config');
const redis = require('../redis');
const libs = require('../libs');

// const MongoDB = Promise.promisifyAll(mongodb);
// const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

const concurrency = 10;

module.exports = co.wrap(function*() {

    // let db = yield MongoClient.connectAsync(config.newsMongoDb);
    let mongodb14 = yield require('../mongodb14');

    let now = Math.floor(+new Date() / 1000);

    let newsList = yield mongodb14.collection('fields_current.node').find({
            '_bundle':'news',
            'field_release_status.value': 1,
            'field_release_status2.value': { $gt: 0 },
            'field_release_date.value': { $lte : now },
            "field_release_date.value": { $gte : now - (24*3600)},
            'field_news_hide.value': 0
        }, {
            _id: 1,
            title: 1,
            created: 1,
            field_main_category: 1,
            field_release_date: 1,
            field_short_title: 1,
            // field_ra: 1
            // body: true,
            // field_news_ref: true
        })
        .sort({
            'field_ra.radioactivity_energy': -1,
            'field_release_date.value': -1
        })
        .limit(50)
        .toArrayAsync();
    // debug('newsList = %j', newsList);

    let newsWithImage = yield Promise.map(newsList, function(news) {
        return libs.getImageFromNews(news);
    }, { concurrency: concurrency });


    // 找尋新聞分類
    yield Promise.map(newsList, function(news) {
        return libs.findNewsMainCategory(news);
    }, { concurrency: concurrency });

    // 時間正規化
    _.map(newsList, function(news) {
        news.createdAt = moment(news.created * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss');
    });

    debug('newsWithImage = %j', newsWithImage);

    // 處理列表廣告
    let ads = yield libs.newsNativeAds();

    yield redis.setValue('hotNews', {
        newsList: newsWithImage,
        ads: ads
    }, 3600 * 24);

    return Promise.resolve({});
});
