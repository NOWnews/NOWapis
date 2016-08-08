import co from 'co';
import Promise from 'bluebird';
import mongodb from 'mongodb';
import moment from 'moment-timezone';
import _ from 'lodash';

const debug = require('debug')('NOWapis:controller:news:newest');

const config = require('../../config');

const MongoDB = Promise.promisifyAll(mongodb);
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

module.exports = function(req, res, next) {

    co(function*(){

        let db = yield MongoClient.connectAsync(config.newsMongoDb);

        let newestNews = yield db.collection('fields_current.node').find({
                _bundle: 'news',
                'field_release_status.value': 1
            })
            .sort({_id: -1})
            .limit(10)
            .toArrayAsync();

        debug('newestNews = %j', newestNews);

        let nodeIds = _.map(newestNews, function(news) {
            let time = moment(news.created * 1000).format('YYYY/MM/DD');
            return `http://www.nownews.com/n/${time}/${news._id}`;
        });

        yield db.closeAsync();

        res.status(200);
        return res.json(nodeIds);
    })
    .catch(next);
};