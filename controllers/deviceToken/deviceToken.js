const debug = require('debug')('NOWapis:controller:deviceToken');

import co from 'co';

module.exports = (req, res, next) => {
    co(function*() {

        let mongodb14 = yield require('../../mongodb14');

        let data = {
            'uname': req.query.uname,
            'uid': req.query.uid,
            'platform': req.query.platform,
            'type': req.query.type,
            'model': req.query.model,
            'vc': req.query.vc,
            'vn': req.query.vn,
            'subscribe': req.query.subscribe,
            'token': req.query.token,
            'date': new Date()
        };

        yield mongodb14.collection('mobile_device').updateAsync({
            'platform': data.platform,
            'uid': data.uid
        }, data, { upsert: true });

        return res.status(200).send();
    })
    .catch(next);
};