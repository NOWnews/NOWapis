
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

module.exports = co.wrap(function*() {

    let db = yield MongoClient.connectAsync(config.newsMongoDb);

    let categories = yield redis.getValue('categories');

    // 撈取所有 category 新聞
    let categoryWithNews = yield Promise.map(categories, function(category) {
        return db.collection('fields_current.node').find({
           // _bundle: 'news',
           // _type: 'node',
           'field_main_category.tid': category._id
        }, {
            _id: 1,
            title: 1,
            // field_main_category: true,
            field_release_date: 1,
            // body: true,
            // field_news_ref: true
        })
        .limit(30)
        .sort({ 'field_release_date.value': -1 })
        .toArray()
        .then(function(categoryNews) {
            return Promise.resolve({
                categoryId: category._id,
                news: categoryNews
            });
        });
    }, { concurrency: 3 });

    // 將所有新聞整合在一起
    let allNews = [];
    _.forEach(categoryWithNews, function(category) {
        allNews = _.concat(allNews, category.news);
    });

    // 將所有新聞加入新聞圖
    yield Promise.map(allNews, function(news) {
        return libs.getImageFromNews(news);
    }, { concurrency: 10 });

    // 存入 redis
    yield Promise.map(categoryWithNews, function(category) {
        return redis.setValue(`category${category.categoryId}`, category, 3600 * 24);
    });

    return Promise.resolve({});
});
