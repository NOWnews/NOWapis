import co from 'co';
import Promise from 'bluebird';
import mongodb from 'mongodb';
import _ from 'lodash';
import moment from 'moment-timezone';

const debug = require('debug')('NOWapis:controller:channels:newsList');

const redis = require('../../redis');
const libs = require('../../libs');
const config = require('../../config');

const MongoDB = Promise.promisifyAll(mongodb);
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);


module.exports = function(req, res, next) {

    let channelNodeId = parseInt(req.params.nodeId, 10);

    co(function*() {

        // 去跟 redis 要資料，有資料直接 response
        let redisChannelNews = yield redis.getValue(`channel${channelNodeId}`);
        debug('redisChannelNews = %j', redisChannelNews);
        if(redisChannelNews && redisChannelNews.length !== 0) {
            return res.json(redisChannelNews);
        }

        let db = yield MongoClient.connectAsync(config.newsMongoDb);

        // 找到某個 channel
        let channel = yield db.collection('fields_current.node').findOneAsync({
                _id: channelNodeId,
                'field_release_status.value': 1
            }, {
                title: 1,
                _id: 1,
                field_node: 1
            });
            // .sort({
            //     'field_homepos.value': -1
            // });
        debug('channel = %j', channel);

        // 把 channel 的 node id 撈出來
        let nodeIds = _.map(channel.field_node, function(node) {
            return node.target_id;
        });
        debug('nodeIds = %j', nodeIds);

        // 用 node id 去找相關的新聞
        let channelWithNews = yield db.collection('fields_current.node').find({
            _id: { $in : nodeIds }
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
        .toArrayAsync();
        debug('channelWithNews = %j', channelWithNews);

        //  加入新聞圖片
        let newsWithImage = yield Promise.map(channelWithNews, function(news) {
            return libs.getImageFromNews(news);
        });

        // 用來排列順序的資料
        let compareNews = {};
        _.forEach(channelWithNews, function(news) {
            compareNews[news._id] = news;
        });

        // 排序完成的資料
        let sortedNews = _.map(nodeIds, function(id) {
            return compareNews[id];
        });

        // 把資料存入 redis 並且關掉 db instance
        yield [
            redis.setValue(`channel${channelNodeId}`, sortedNews, 180),
            db.closeAsync()
        ];

        return res.send(sortedNews);
    })
    .catch(next);
};