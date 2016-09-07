
import co from 'co';
import Promise from 'bluebird';
// import mongodb from 'mongodb';
import _ from 'lodash';
import moment from 'moment-timezone';
import request from 'request-promise';

const debug = require('debug')('NOWapis:cronjobs:instant');
// const config = require('../config');
const redis = require('../redis');
const libs = require('../libs');

// const MongoDB = Promise.promisifyAll(mongodb);
// const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

const concurrency = 10;

module.exports = co.wrap(function*() {

    // let db = yield MongoClient.connectAsync(config.newsMongoDb);
    let mongodb14 = yield require('../mongodb14');
    let now = Math.floor(+new Date() / 1000);
    let tid = 2611;

    // 找出速報的關聯
    let instanceRelations = yield mongodb14.collection('fields_current.relation').find({
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
    let newsList = yield mongodb14.collection('fields_current.node').find({
        _id: { $in: nodeIds }
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
    .toArrayAsync();

    // 加入新聞圖片
    // let newsWithImage = yield Promise.mapSeries(newsList, function(news) {
    //     return libs.getImageFromNews(news);
    // });
    // yield libs.getImageFromNodeIds(nodeIds);

    // 尋找新聞首圖
    let newsWithImage = yield Promise.map(newsList, function(news) {
        return libs.getImageFromNews(news);
    }, { concurrency: concurrency });

    // 找尋新聞分類
    yield Promise.map(newsList, function(news) {
        return libs.findNewsMainCategory(news);
    }, { concurrency: concurrency });

    // 時間正規化
    _.map(newsList, function(news) {
        news.createdAt = moment(news.created * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss');
    });

    // 比較排序
    let compareNews = {};
    _.forEach(newsList, function(news) {
        compareNews[news._id] = news;
    });
    
    // 重新排序新聞
    let sortedNewsList = _.map(nodeIds, function(nodeId) {
        return compareNews[nodeId];
    });

    // 處理廣告
    let ads = yield [
        request('http://ad1.nownews.com/ads.php?ownerid=2995', { json: true }),
        request('http://ad1.nownews.com/ads.php?ownerid=2996', { json: true }),
        request('http://ad1.nownews.com/ads.php?ownerid=2997', { json: true }),
        request('http://ad1.nownews.com/ads.php?ownerid=2998', { json: true }),
        request('http://ad1.nownews.com/ads.php?ownerid=2999', { json: true }),
        request('http://ad1.nownews.com/ads.php?ownerid=3000', { json: true }),
        request('http://ad1.nownews.com/ads.php?ownerid=3001', { json: true })
    ];

    ads = _.map(ads, (ad, idx) => {
        return {
            sn: idx + 1,
            ad: ad || null
        };
    });

    yield redis.setValue('hotNews', {
        newsList: sortedNewsList,
        ads: ads
    }, 3600 * 24);

    // yield redis.setValue('instant', sortedNewsList, 3600 * 24);
    // yield [
    //     redis.setValue('instant', sortedNewsList, 3600 * 24),
    //     db.closeAsync()
    // ];

    return Promise.resolve({});
});
