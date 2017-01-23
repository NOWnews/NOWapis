
import co from 'co';
import Promise from 'bluebird';
import _ from 'lodash';

import request from 'request-promise';

const debug = require('debug')('NOWapis:cronjobs:updateCsmuseChannels');
const redis = require('../redis');

const whiteList = ['6','10','12','22','25','31','38','39','48','51','53','55','56','70','73','75','76','79','120','121'];

module.exports = co.wrap(function*() {

    let options = {
        uri: `http://dvbt-tw.kikiplay.com.tw/dvbt/api/nownews/getInfo.php?Time=1&Key=0c691089feabda737a315ce2664fdc27`,
        json: true
    };

    // 去拿所有頻道列表
    let csmuseData = yield request(options);
    debug('csmuse csmuseData = %j', csmuseData);

    // 整理資料與分類
    let formatChannels = {};
    let keys = [];

    _.forEach(csmuseData.Channel, (channel) => {

        // 除了白名單之外，其他的濾掉
        if(!_.includes(whiteList, channel.code)) {
            return;
        }

        if(!formatChannels[channel.class]) {
            formatChannels[channel.class] = [];
        }

        keys.push(channel.class);

        // 因為 android 的關鍵字是 class，所以要先拿掉
        delete channel.class;

        formatChannels[channel.class].push(channel);
    });
    debug('csmuse formatChannels = %j', formatChannels);

    // 去除掉重複的頻道
    keys = _.uniqBy(keys, function (key) {
        return key;
    });
    debug('csmuse keys = %j', keys);

    let result = {};

    // 拼成最後需要的格式
    result.data = _.map(keys, (key) => {
        return {
            categoryName: key,
            count: formatChannels[key].length,
            list: formatChannels[key]
        };
    });
    debug('csmuse result = %j', result);

    yield redis.setValue('csmuseChannels', result, 3600 * 24);

    return yield Promise.resolve({});
});
