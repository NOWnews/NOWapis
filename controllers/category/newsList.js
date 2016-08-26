import co from 'co';
import Promise from 'bluebird';
// import mongodb from 'mongodb';
import _ from 'lodash';
import moment from 'moment-timezone';

const debug = require('debug')('NOWapis:controller:category:newsList');
const redis = require('../../redis');
const libs = require('../../libs');
// const config = require('../../config');

// const MongoDB = Promise.promisifyAll(mongodb);
// const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);
const concurrency = 10;

module.exports = function(req, res, next) {

    let { taxId } = req.params;
    let { limit, skip, page } = req.query;

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
        // let db = yield MongoClient.connectAsync(config.newsMongoDb);
        let mongodb14 = yield require('../../mongodb14');

        // 找出某個分類的新聞
        let categoryNews = yield mongodb14.collection('fields_current.node').find({
           _bundle: 'news',
           _type: 'node',
           'field_main_category.tid': parseInt(taxId, 10)
        }, {
            _id: 1,
            title: 1,
            created: 1,
            field_main_category: 1,
            field_release_date: 1,
            field_short_title: 1,
            // body: true,
            // field_news_ref: true
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
        }, { concurrency: concurrency });

        // 時間正規化
        _.map(newsData, function(news) {
            news.createdAt = moment(news.field_release_date.value * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss');
        });

        // 把資料存入 redis
        if(page === 1) {
            yield redis.setValue(`category${taxId}`, newsData, 180);
        }

        return res.send(newsData);
    })
    .catch(next);
};