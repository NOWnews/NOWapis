
import co from 'co';
import mongodb from 'mongodb';
import Promise from 'bluebird';
// import _ from 'lodash';

const debug = require('debug')('NOWapis:cronjobs:updateCategory');

const config = require('../config');
const redis = require('../redis');

const MongoDB = Promise.promisifyAll(mongodb);
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

module.exports = co.wrap(function*() {
    let db = yield MongoClient.connectAsync(config.newsMongoDb);

    let categories = yield db.collection('fields_current.taxonomy_term').find({
        vid: 14
    })
    .toArrayAsync();

    debug('categories = %j', categories);

    let cacheCategory = yield redis.setValue('categories', categories, 3600 * 24);

    return yield Promise.resolve(cacheCategory);

});