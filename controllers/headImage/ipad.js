const debug = require('debug')('NOWapis:controller:headImage:ipad');

import co from 'co';

module.exports = (req, res, next) => {
    co(function*() {

        let mongodb14 = yield require('../../mongodb14');

        let ipadHeadImage = yield mongodb14.collection('mobile_meta').findOneAsync({
            key: 'ipad'
        });

        ipadHeadImage.data.splash_url = 'https://imgapi.nownews.com/?w=1920&q=75&src=' + ipadHeadImage.data.splash_url;

        return res.json(ipadHeadImage);
    })
    .catch(next);
};