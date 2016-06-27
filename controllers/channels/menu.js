import co from 'co';
// import Promise from 'bluebird';
// import mongodb from 'mongodb';
// import _ from 'lodash';

const debug = require('debug')('NOWapis:controller:channels:menu');

// const config = require('../../config');
const redis = require('../../redis');

// const MongoDB = Promise.promisifyAll(mongodb);
// const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

module.exports = function(req, res, next) {

    co(function*() {

        let menu = yield redis.getValue('channelsMenu');
        debug('menu = %j', menu);

        return res.json(menu);
    })
    .catch(next);
};

/*
 * 備份之前的 code
 */
// module.exports = function(req, res, next) {

//     co(function*() {

//         let db = yield MongoClient.connectAsync(config.newsMongoDb);

//         let mainpage = yield db.collection('fields_current.node').findOne({
//             _bundle: 'mainpage'
//         });

//         let channelIds = _.map(mainpage.field_collection, function(collection) {
//             return collection.target_id;
//         });

//         let channels = yield db.collection('fields_current.node').find({
//             _id: { $in: channelIds },
//             'field_release_status.value': 1
//         })
//         .sort({
//             'field_homepos.value': -1
//         })
//         .toArrayAsync();

//         let menu = _.map(channels, function(channel) {
//             debug('channel = %j', channel);
//             return {
//                 name: channel.title,
//                 nodeId: channel._id
//             };
//         });

//         debug('menu = %j', menu);

//         return res.json(menu);
//     })
//     .catch(next);
// };