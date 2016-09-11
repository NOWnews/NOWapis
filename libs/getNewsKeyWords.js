/*
 * 把整個 news 物件傳入，會找出 news 的關鍵字
 */

const debug = require('debug')('NOWapis:libs:getNewsKeyWords');
const co = require('co');
const Promise = require('bluebird');
const _ = require('lodash');
// const md5 = require('md5');
// const config = require('../config');

// const MongoDB = Promise.promisifyAll(require('mongodb'));
// const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

module.exports = co.wrap(function*(news) {

    let keywords = [];

    if(!news) {
        return Promise.reject(new Error('找不到新聞'));
    }

    if(!news.field_free_tags || news.field_free_tags.length === 0) {
        news.keywords = keywords;
        return Promise.resolve(news);
    }

    let tids = _.map(news.field_free_tags, (tag) => {
        return tag.tid;
    });

    let mongodb14 = yield require('../mongodb14');

    let taxTerms = yield mongodb14.collection('fields_current.taxonomy_term').find({
            _id: { $in: tids }
        }, {
            _id: 1,
            name: 1,
        })
        .toArrayAsync();

    news.keywords = taxTerms;

    return yield Promise.resolve(news);
});