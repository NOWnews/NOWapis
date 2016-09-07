import co from 'co';
import Promise from 'bluebird';
import _ from 'lodash';
import moment from 'moment-timezone';

const debug = require('debug')('NOWapis:controller:channels:newsList');

const redis = require('../../redis');
const libs = require('../../libs');

module.exports = function(req, res, next) {

    let channelNodeId = parseInt(req.params.nodeId, 10);

    co(function*() {

        // 去跟 redis 要資料，有資料直接 response
        let redisChannelNews = yield redis.getValue(`channel${channelNodeId}`);
        debug('redisChannelNews = %j', redisChannelNews);
        if(redisChannelNews && redisChannelNews.length !== 0) {
            return res.json(redisChannelNews);
        }

        let mongodb14 = yield require('../../mongodb14');

        // 找到某個 channel
        let channel = yield mongodb14.collection('fields_current.node').findOneAsync({
                _id: channelNodeId,
                'field_release_status.value': 1
            }, {
                title: 1,
                _id: 1,
                field_node: 1
            });
        debug('channel = %j', channel);

        if(!channel) {
            return yield Promise.reject(new Error('找不到這個頻道'));
        }

        // 把 channel 的 node id 撈出來
        let nodeIds = _.map(channel.field_node, function(node) {
            return node.target_id;
        });
        debug('nodeIds = %j', nodeIds);

        // 用 node id 去找相關的新聞
        let channelWithNews = yield mongodb14.collection('fields_current.node').find({
            _id: { $in : nodeIds }
        }, {
            _id: 1,
            title: 1,
            created: 1,
            field_main_category: 1,
            field_short_title: 1
        })
        .toArrayAsync();
        debug('channelWithNews = %j', channelWithNews);

        //  加入新聞圖片
        let newsWithImage = yield Promise.map(channelWithNews, function(news) {
            return libs.getImageFromNews(news);
        });

        // 找尋新聞分類
        yield Promise.map(channelWithNews, function(news) {
            return libs.findNewsMainCategory(news);
        });

        // 時間正規化
        _.map(channelWithNews, function(news) {
            news.createdAt = moment(news.created * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss');
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

        let output = {
            channelId: channel._id,
            channelName: channel.title,
            newsList: sortedNews
        };

        // 把資料存入 redis 並且關掉 db instance
        yield redis.setValue(`channel${channelNodeId}`, output, 180);

        return res.send(output);
    })
    .catch(next);
};