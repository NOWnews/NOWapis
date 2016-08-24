
import co from 'co';
import Promise from 'bluebird';

const debug = require('debug')('NOWapis:cronjobs:updatePhotosCategory');

const redis = require('../redis');

// 只能先寫死了...根本無從判斷
const photosConfig = [
    { tid: 2691, name: '圖集總覽' },
    { tid: 2551, name: '影劇' },
    { tid: 3472, name: '正妹' },
    { tid: 3471, name: '要聞' },
    { tid: 2562, name: '新奇' },
    { tid: 2730, name: '寵物' },
    { tid: 2607, name: '運動' },
    { tid: 2806, name: '旅遊' },
    { tid: 8039, name: '名人' },
    { tid: 2559, name: '其他' },
];

module.exports = co.wrap(function*() {

    let mongodb14 = yield require('../mongodb14');

    let photosCategory = yield Promise.map(photosConfig, function(photo) {
        return mongodb14.collection('fields_current.taxonomy_term').findOneAsync({
                _id: photo.tid
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

    let cachePhotosCategory = yield redis.setValue('photosCategories', photosCategory, 3600 * 24);

    return yield Promise.resolve(cachePhotosCategory);
});