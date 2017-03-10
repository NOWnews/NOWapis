
import co from 'co';
import Promise from 'bluebird';
import _ from 'lodash';

const debug = require('debug')('NOWapis:cronjobs:updateCategory');

const redis = require('../redis');

module.exports = co.wrap(function*() {

    let mongodb14 = yield require('../mongodb14');

    let categories = yield mongodb14.collection('fields_current.taxonomy_term').find({
            vid: 14
        })
        .toArrayAsync();

    // 拿掉圖集跟影音跟健康
    categories = _.filter(categories, (category) => {
        return (category._id !== 449377) && (category._id !== 419897) && (category._id !== 419896);
    });
    debug('categories = %j', categories);

    let cacheCategory = yield redis.setValue('categories', categories, 3600 * 24);

    return yield Promise.resolve(cacheCategory);

});
