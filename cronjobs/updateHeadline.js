
import co from 'co';
import Promise from 'bluebird';
import mongodb from 'mongodb';
import _ from 'lodash';
import moment from 'moment-timezone';

const debug = require('debug')('NOWapis:cronjobs:updateHeadline');
const config = require('../config');
const redis = require('../redis');
const libs = require('../libs');

const MongoDB = Promise.promisifyAll(mongodb);
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

const concurrency = 10;

module.exports = co.wrap(function*() {

    let db = yield MongoClient.connectAsync(config.newsMongoDb);

    let headlineNode = yield db.collection('fields_current.node').findOneAsync({
        _bundle: 'mainpage'
    });

    let headlineNewsIds = _.map(headlineNode.field_header, function(item) {
        return item.target_id;
    });

    let headlineNewsNodes = yield db.collection('fields_current.node').find({
            _id: { $in: headlineNewsIds }
        }, {
            _id: 1,
            title: 1,
            created: 1,
            // field_main_category: true,
            field_release_date: 1,
            field_short_title: 1,
            field_main_category: 1,
            // body: true,
            // field_news_ref: true
        })
        .toArrayAsync()
        .then(function(news) {
            return Promise.resolve(news);
        });

    // yield Promise.mapSeries(headlineNewsNodes, function(news) {
    //     return libs.getImageFromNews(news);
    // });

    // 找尋新聞首圖
    yield Promise.map(headlineNewsNodes, function(news) {
        return libs.getImageFromNews(news);
    }, { concurrency: concurrency });

    // 找尋新聞分類
    yield Promise.map(headlineNewsNodes, function(news) {
        return libs.findNewsMainCategory(news);
    }, { concurrency: concurrency });

    // 時間正規化
    _.map(headlineNewsNodes, function(news) {
        news.createdAt = moment(news.created * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss');
    });
 
    let compareNews = {};
    _.forEach(headlineNewsNodes, function(news) {
        compareNews[news._id] = news;
    });

    // 排序新聞
    let sortedNews = _.map(headlineNewsIds, function(id) {
        return compareNews[id];
    });

    // debug('headlineNewsNodes = %j', headlineNewsNodes);
    debug('sortedNews = %j', sortedNews);

    yield [
        redis.setValue('headline', sortedNews, 3600 * 24),
        db.closeAsync()
    ];

    return yield Promise.resolve({});
});
