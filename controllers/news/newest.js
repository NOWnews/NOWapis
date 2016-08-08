import co from 'co';
import Promise from 'bluebird';
import mongodb from 'mongodb';

const debug = require('debug')('NOWapis:controller:news:newest');

const config = require('../../config');

const MongoDB = Promise.promisifyAll(mongodb);
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

module.exports = function(req, res, next) {

    co(function*(){

        let db = yield MongoClient.connectAsync(config.newsMongoDb);

        let newestNews = yield db.collection('fields_current.node').find({
                _bundle: 'news'
            })
            .sort({_id: -1})
            .limit(10)
            .toArrayAsync();

        debug('newestNews = %j', newestNews);

        yield db.closeAsync();

        res.status(200);
        return res.json(newestNews);
    })
    .catch(next);
};