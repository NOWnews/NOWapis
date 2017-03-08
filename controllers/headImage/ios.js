const debug = require('debug')('NOWapis:controller:headImage:ios');

import co from 'co';

module.exports = (req, res, next) => {
    co(function*() {

        let mongodb14 = yield require('../../mongodb14');

        let iosHeadImage = yield mongodb14.collection('mobile_meta').findOneAsync({
            key: 'ios'
        });

        return res.json({
            hash: iosHeadImage.data.splash_hash,
            url: 'https://imgapi.nownews.com/?w=1920&q=75&src=' + iosHeadImage.data.splash_url,
            adKey: iosHeadImage.data.splash_adkey,
            adType: iosHeadImage.data.splash_adtype
        });
    })
    .catch(next);
};