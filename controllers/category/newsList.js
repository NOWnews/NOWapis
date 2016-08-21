import co from 'co';
import Promise from 'bluebird';
// import mongodb from 'mongodb';
// import _ from 'lodash';
// import moment from 'moment-timezone';

const debug = require('debug')('NOWapis:controller:category:newsList');
const redis = require('../../redis');
const libs = require('../../libs');
// const config = require('../../config');

// const MongoDB = Promise.promisifyAll(mongodb);
// const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

module.exports = function(req, res, next) {

    let categoryId = parseInt(req.params.nodeId, 10);
    debug('categoryId = %s', categoryId);

    co(function*() {

        // 去跟 redis 要資料，有資料直接 response
        let redisCategoryNews = yield redis.getValue(`category${categoryId}`);
        debug('redisCategoryNews = %j', redisCategoryNews);
        if(redisCategoryNews && redisCategoryNews.length !== 0) {
            return res.json(redisCategoryNews);
        }

        // 如果沒有資料就進去 db 撈，並且 cache 起來
        // let db = yield MongoClient.connectAsync(config.newsMongoDb);
        let mongodb14 = yield require('../../mongodb14');

        // 找出某個分類的新聞
        let categoryNews = yield mongodb14.collection('fields_current.node').find({
           _bundle: 'news',
           _type: 'node',
           'field_main_category.tid': categoryId
        }, {
            _id: 1,
            title: 1,
            // field_main_category: true,
            field_release_date: 1,
            field_short_title: 1,
            // body: true,
            // field_news_ref: true
        })
        .limit(15)
        .sort({ 'field_release_date.value': -1 })
        .toArrayAsync();

        // 找出圖片
        let newsWithImage = yield Promise.map(categoryNews, function(news) {
            return libs.getImageFromNews(news);
        });

        // 把資料存入 redis
        yield redis.setValue(`category${categoryId}`, newsWithImage, 180);

        return res.send(newsWithImage);
    })
    .catch(next);
};