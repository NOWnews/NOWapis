
import co from 'co';
import Promise from 'bluebird';
import mongodb from 'mongodb';
import _ from 'lodash';
import moment from 'moment-timezone';

const debug = require('debug')('NOWapis:cronjobs:updateChannelsNews');
const config = require('../config');
const redis = require('../redis');
const libs = require('../libs');

const MongoDB = Promise.promisifyAll(mongodb);
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

module.exports = co.wrap(function*() {

    let db = yield MongoClient.connectAsync(config.newsMongoDb);

    let menu = yield redis.getValue('channelsMenu');

    // 找出所有特輯與他相關的新聞 id
    let channels = _.map(menu, function(channel) {
        let nodeIds = _.map(channel.news, function(news) {
            return news.target_id;
        });

        return {
            name: channel.name,
            nodeId: channel.nodeId,
            news: nodeIds
        };
    });

    // 找出每個 channel 相關的新聞
    let channelsNews = yield Promise.map(channels, function(channel) {
        return db.collection('fields_current.node').find({
            _id: { $in: channel.news }
        }, {
            _id: 1,
            title: 1,
            created: 1,
            changed: 1,
            body: 1,
            // field_adult: 1,
            field_authors: 1,
            field_newsby: 1,
            field_short_title: 1,
        })
        .toArrayAsync()
        .then(function(newsData) {
            // debug('channel name = %s', channel.name);
            // debug('newsData = %j', newsData);
            return Promise.resolve({
                name: channel.name,
                nodeId: channel.nodeId,
                news: newsData
            });
        });
    });

    // 找出所有新聞
    let allNews = [];
    _.forEach(channelsNews, function(channel) {
        // debug('channel.news = %s', channel.news.length);
        // allNews = [];
        allNews = _.concat(allNews, channel.news);
    });

    // debug('allNews = %j', allNews);
    // debug('allNews length = %s', allNews.length);

    let compareNews = {};
    let count = 0;

    // 將所有新聞加入新聞圖
    debug(`開始撈取新聞時間: ${moment().tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss')}`);
    yield Promise.map(allNews, function(news) {
        // debug('news = %s', news._id);
        count++;
        debug('count = %d', count);
        return libs.getImageFromNews(news)
            .then(function(news) {
                // debug('news = %j', news);
                // 新聞內容格式化
                let formatNews = {
                    nodeId: news._id,
                    title: news.title,
                    shoutTitle: (news.field_short_title && news.field_short_title.value) || '',
                    summary: (news.body && news.body.summary) || '',
                    created: news.created,
                    changed: news.changed,
                    createdAt: moment(news.created*1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss'),
                    updatedAt: moment(news.changed*1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss'),
                    image: news.image
                };

                compareNews[news._id] = formatNews;
                return Promise.resolve(formatNews);
            });
    }, { concurrency: 10 });
    debug(`結束撈取新聞時間: ${moment().tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss')}`);

    // debug('compareNews = %j', compareNews);


    // 整理 channels 新聞的排序
    yield Promise.map(channels, function(channel) {
        let newsWithImage = _.map(channel.news, function(newsId) {
            return compareNews[newsId];
        });

        channel.news = newsWithImage;
        return redis.setValue(`channel${channel.nodeId}`, channel, 3600 * 24);
    });

    return Promise.resolve({});
});
