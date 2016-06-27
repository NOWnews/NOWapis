import co from 'co';
import Promise from 'bluebird';
import mongodb from 'mongodb';
import _ from 'lodash';
import moment from 'moment-timezone';

const debug = require('debug')('NOWapis:controller:channels:newsList');

const config = require('../../config');

const MongoDB = Promise.promisifyAll(mongodb);
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);


module.exports = function(req, res, next) {

    let channelNodeId = parseInt(req.params.nodeId, 10);

    co(function*() {

        let db = yield MongoClient.connectAsync(config.newsMongoDb);

        // 找出這個特輯的資料
        let channel = yield db.collection('fields_current.node').findOne({
            _id: channelNodeId
        });

        // 取得特輯內相關新聞的 nodeId
        let channelNewsIds = _.map(channel.field_node, function(node) {
            return node.target_id;
        });

        debug('channelNewsIds = %j', channelNewsIds);

        // 找出所有新聞
        let channelNews = yield db.collection('fields_current.node').find({
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
        .toArrayAsync();

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


        return res.send(sortedChannelNews);
    })
    .catch(next);
};