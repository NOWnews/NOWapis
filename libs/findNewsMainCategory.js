
import co from 'co';
import Promise from 'bluebird';
// import mongodb from 'mongodb';

// const MongoDB = Promise.promisifyAll(mongodb);
// const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);
// const config = require('../config');

const debug = require('debug')('NOWapis:libs:findNewsMainCategory');

module.exports = co.wrap(function*(news) {

    if(!news || !news.field_main_category) {
        news.category = null;
        return yield Promise.resolve(news);
    }

    // let db = yield MongoClient.connectAsync(config.newsMongoDb);
    let mongodb14 = yield require('../mongodb14');

    let mainTid = news.field_main_category.tid;

    let tax = yield mongodb14.collection('fields_current.taxonomy_term')
        .findOneAsync({
            _id: mainTid
        }, {
            _id: 1,
            name: 1
        });

    news.category = tax;

    // yield db.closeAsync();

    return yield Promise.resolve(news);
});