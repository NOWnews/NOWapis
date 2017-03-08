const debug = require('debug')('NOWapis:controller:headImage:android');

import co from 'co';

module.exports = (req, res, next) => {
    co(function*() {

        let mongodb14 = yield require('../../mongodb14');

        let androidHeadImage = yield mongodb14.collection('mobile_meta').findOneAsync({
            key: 'android'
        });

        return res.json({
            hash: androidHeadImage.data.splash_hash,
            url: 'https://imgapi.nownews.com/?w=1920&q=75&src=' + androidHeadImage.data.splash_url,
            adKey: androidHeadImage.data.splash_adkey,
            adType: androidHeadImage.data.splash_adtype
        });
    })
    .catch(next);
};