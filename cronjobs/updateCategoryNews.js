
import co from 'co';
import Promise from 'bluebird';
import mongodb from 'mongodb';
import _ from 'lodash';
import moment from 'moment-timezone';

const debug = require('debug')('NOWapis:cronjobs:updateCategoryNews');
const config = require('../config');
const redis = require('../redis');
const libs = require('../libs');

const MongoDB = Promise.promisifyAll(mongodb);
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);
const concurrency = 10;

module.exports = co.wrap(function*() {

    let db = yield MongoClient.connectAsync(config.newsMongoDb);

    let categories = yield redis.getValue('categories');

    // 撈取所有 category 新聞
    let categoryWithNews = yield Promise.map(categories, function(category) {
        return db.collection('fields_current.node').find({
           _bundle: 'news',
           _type: 'node',
           'field_main_category.tid': category._id
        }, {
            _id: 1,
            title: 1,
            // field_main_category: true,
            field_release_date: 1,
            field_short_title: 1,
            // body: true,
            // field_news_ref: true
        })
        .limit(30)
        .sort({ 'field_release_date.value': -1 })
        .toArrayAsync()
        .then(function(categoryNews) {
            debug('categoryNews = %j', categoryNews);
            return Promise.resolve({
                categoryId: category._id,
                news: categoryNews
            });
        });
    });

    // 將所有新聞整合在一起
    let allNews = [];
    _.forEach(categoryWithNews, function(category) {
        allNews = _.concat(allNews, category.news);
    });

    let count = 0;
    debug(`開始撈取新聞時間: ${moment().tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss')}`);
    // 將所有新聞加入新聞圖
    // yield Promise.mapSeries(allNews, function(news) {
    //     count++;
    //     debug('count = %d', count);
    //     return libs.getImageFromNews(news);
    // });
    yield Promise.map(allNews, function(news) {
        count++;
        debug('count = %d', count);
        return libs.getImageFromNews(news);
    }, { concurrency: concurrency });
    debug(`結束撈取新聞時間: ${moment().tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss')}`);

    // 存入 redis
    yield Promise.map(categoryWithNews, function(category) {
        return redis.setValue(`category${category.categoryId}`, category, 3600 * 24);
    });
    yield db.closeAsync();

    return Promise.resolve({});
});
