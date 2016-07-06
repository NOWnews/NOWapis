
import co from 'co';
import Promise from 'bluebird';
import mongodb from 'mongodb';
import _ from 'lodash';
// import moment from 'moment-timezone';

const debug = require('debug')('NOWapis:cronjobs:instant');
const config = require('../config');
const redis = require('../redis');
const libs = require('../libs');

const MongoDB = Promise.promisifyAll(mongodb);
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

module.exports = co.wrap(function*() {

    let db = yield MongoClient.connectAsync(config.newsMongoDb);
    let now = Math.floor(+new Date() / 1000);
    let tid = 2611;

    // 找出速報的關聯
    let instanceRelations = yield db.collection('fields_current.relation').find({
        _bundle: 'moderator',
        endpoints: {
            entity_type: 'taxonomy_term',
            entity_id: tid, 
            r_index: 1
        },
        'field_release_date.value': {
            $lte: now
        },
        'field_release_status.value': 1
    }, {
        _id: 0,
        endpoints: {
            $elemMatch: { r_index: 0 }
        }
    })
    .sort({
        // 'field_ra.radioactivity_energy': -1,
        'field_release_date.value': -1
    })
    .limit(50)
    .toArrayAsync();

    // 將速報關聯內的新聞 id 撈出來
    let nodeIds = [];
    _.forEach(instanceRelations, function(relation) {
        _.forEach(relation.endpoints, function(entity) {
            if(entity.entity_type === 'node' && entity.entity_id !== tid) {
                nodeIds.push(entity.entity_id);
            }
        });
    });

    // 找尋所有新聞
    let newsList = yield db.collection('fields_current.node').find({
        _id: { $in: nodeIds }
    }, {
        _id: 1,
        title: 1,
        // field_main_category: true,
        field_release_date: 1,
        field_short_title: 1,
        // body: true,
        // field_news_ref: true
    })
    .toArrayAsync();

    // 加入新聞圖片
    let newsWithImage = yield Promise.mapSeries(newsList, function(news) {
        return libs.getImageFromNews(news);
    });
    // let newsWithImage = yield Promise.map(newsList, function(news) {
    //     return libs.getImageFromNews(news);
    // }, { concurrency: 5 });

    // 比較排序
    let compareNews = {};
    _.forEach(newsList, function(news) {
        compareNews[news._id] = news;
    });
    
    // 重新排序新聞
    let sortedNewsList = _.map(nodeIds, function(nodeId) {
        return compareNews[nodeId];
    });

    yield redis.setValue('instant', sortedNewsList, 3600 * 24);
    yield db.closeAsync();
    return Promise.resolve({});
});
