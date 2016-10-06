const debug = require('debug')('NOWapis:controller:nearByNews:list');
import co from 'co';
import Promise from 'bluebird';
import request from 'request-promise';
import _ from 'lodash';
import moment from 'moment-timezone';

import config from '../../config';
import libs from '../../libs';

module.exports = (req, res, next) => {

    console.log(req.query);
    let { latitude, longitude } = req.query;

    co(function*() {

        // 去跟 PV 系統要 news location 的資料
        let newsNodeIds = yield request(`http://${config.pageview.host}:${config.pageview.port}/news/nearByNews?longitude=${longitude}&latitude=${latitude}`, {
            timeout: 10000,
            json: true
        });

        if(!newsNodeIds || newsNodeIds.length === 0) {
            return Promise.reject(new Error('附近的人都不看新聞的 :('));
        }

        debug('newsNodeIds = %j', newsNodeIds);

        let mongodb14 = yield require('../../mongodb14');

        let newsList = yield mongodb14.collection('fields_current.node').find({
                _id: { $in: newsNodeIds }
            })
            .sort({ 'field_release_date.value': -1 })
            .toArrayAsync();

        // 找出圖片
        let newsData = yield Promise.map(newsList, function(news) {
            return libs.getImageFromNews(news);
        });

        // 找尋新聞分類
        yield Promise.map(newsData, function(news) {
            return libs.findNewsMainCategory(news);
        });

        // 時間正規化
        _.map(newsData, function(news) {
            news.createdAt = moment(news.field_release_date.value * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss');
        });

        debug('newsList = %j', newsList);

        return res.json({
            newsList: newsData
        });
    })
    .catch(next);
};