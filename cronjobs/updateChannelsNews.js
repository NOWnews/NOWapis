
import co from 'co';
import Promise from 'bluebird';
import mongodb from 'mongodb';
import _ from 'lodash';
import moment from 'moment-timezone';

// const debug = require('debug')('NOWapis:controller:channels:menu');

const config = require('../config');
const redis = require('../redis');

const MongoDB = Promise.promisifyAll(mongodb);
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

module.exports = co.wrap(function*() {

    let db = yield MongoClient.connectAsync(config.newsMongoDb);

    let menu = yield redis.getValue('channelsMenu');

    // 把所有 channel 裡面的新聞塞到 redis
    let results = yield Promise.map(menu, function(channel) {
            return db.collection('fields_current.node').findOne({
                    _id: channel.nodeId
                })
                .then(function(channelData) {

                    // 取得特輯內相關新聞的 nodeId
                    let channelNewsIds = _.map(channelData.field_node, function(node) {
                        return node.target_id;
                    });

                    return db.collection('fields_current.node').find({
                                _id: { $in: channelNewsIds }
                            }, {
                                _id: 1,
                                title: 1,
                                created: 1,
                                changed: 1,
                                body: 1,
                                field_adult: 1,
                                field_authors: 1,
                                field_newsby: 1,
                                field_short_title: 1,
                            })
                            .toArrayAsync()
                            .then(function(channelNews) {

                                /*
                                 * TODO: 處理新聞圖片
                                 */

                                /*
                                 * 排序所有新聞，順便處理新聞資料格式，沒有任何的值可以參考，只能硬幹
                                 */
                                let compareChannelNews = {};
                                _.forEach(channelNews, function(news) {
                                    compareChannelNews[news._id] = {
                                        nodeId: news._id,
                                        title: news.body.summary,
                                        summary: news.title,
                                        shortTitle: (news.field_short_title && news.field_short_title.value) || '',
                                        created: news.created,
                                        changed: news.changed,
                                        createdAt: moment(news.created * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss'),
                                        updatedAt: moment(news.changed * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss'),
                                        author: (news.field_newsby && news.field_newsby.value) || '',
                                    };
                                });

                                let sortedChannelNews = _.map(channelNewsIds, function(nodeId) {
                                    return compareChannelNews[nodeId];
                                });

                                return redis.setValue(channel.nodeId, sortedChannelNews);
                            });
                });
        });

    return Promise.resolve(results);
});