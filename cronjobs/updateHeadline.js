
import co from 'co';
import Promise from 'bluebird';
import _ from 'lodash';
import moment from 'moment-timezone';

const debug = require('debug')('NOWapis:cronjobs:updateHeadline');
const redis = require('../redis');
const libs = require('../libs');

const concurrency = 10;

module.exports = co.wrap(function*() {

    let mongodb14 = yield require('../mongodb14');

    let headlineNode = yield mongodb14.collection('fields_current.node').findOneAsync({
        _bundle: 'mainpage'
    });

    let headlineNewsIds = _.map(headlineNode.field_header, function(item) {
        return item.target_id;
    });

    let headlineNewsNodes = yield mongodb14.collection('fields_current.node').find({
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

    // 處理列表廣告
    let ads = yield libs.newsNativeAds();

    yield redis.setValue('headline', {
        newsList: sortedNews,
        ads: ads
    }, 3600 * 24);

    return yield Promise.resolve({});
});
