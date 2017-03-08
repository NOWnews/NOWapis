const debug = require('debug')('NOWapis:controller:headImage:ios');

import co from 'co';

module.exports = (req, res, next) => {
    co(function*() {

        let mongodb14 = yield require('../../mongodb14');

        let iosHeadImage = yield mongodb14.collection('mobile_meta').findOneAsync({
            key: 'ios'
        });

        iosHeadImage.data.splash_url = 'https://imgapi.nownews.com/?w=1920&q=75&src=' + iosHeadImage.data.splash_url;

        return res.json(iosHeadImage);
    })
    .catch(next);
};