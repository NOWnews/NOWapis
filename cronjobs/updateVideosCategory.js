 import co from 'co';
 import Promise from 'bluebird';
 import config from '../config';
 
 const debug = require('debug')('NOWapis:cronjobs:updateVideosCategory');
 
 const redis = require('../redis');
 
 module.exports = co.wrap(function*() {
 
     let mongodb14 = yield require('../mongodb14');
 
     let videoCategoris = yield Promise.map(config.videosTids, function(video) {
         return mongodb14.collection('fields_current.taxonomy_term').findOneAsync({
                 _id: video.tid
             }, {
                 _id: 1,
                 tid: 1,
                 vid: 1,
                 name: 1,
                 weight: 1
             })
             .then(function(tax) {
                 return Promise.resolve(tax);
             });
     });
 
     let cacheVideosCategories = yield redis.setValue('videosCategories', videoCategoris, 3600 * 24);
 
     return yield Promise.resolve(cacheVideosCategories);
 });