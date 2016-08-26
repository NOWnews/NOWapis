
const debug = require('debug')('NOWapis:controller:search:newsTitleSearch');

import co from 'co';
import Promise from 'bluebird';
import moment from 'moment-timezone';
import _ from 'lodash';

import libs from '../../libs';

const concurrency = 10;

module.exports = (req, res, next) => {

    let { keyword, type, limit, page } = req.query;

    co(function*() {

        let mongodb14 = yield require('../../mongodb14');

        let searchNews = yield mongodb14.collection('fields_current.node').find({
                _bundle: 'news',
                title: new RegExp(keyword, 'i'),
                'field_release_status.value': 1
            }, {
                _id: 1,
                title: 1,
                created: 1,
                field_main_category: 1,
                field_release_date: 1,
                field_short_title: 1,
            })
            .sort({ 'field_release_date.value': -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .toArrayAsync();

        debug('searchNews = %j', searchNews);

        // 找出圖片
        let newsData = yield Promise.map(searchNews, function(news) {
            return libs.getImageFromNews(news);
        });

        // 找尋新聞分類
        yield Promise.map(searchNews, function(news) {
            return libs.findNewsMainCategory(news);
        }, { concurrency: concurrency });

        // 時間正規化
        _.map(searchNews, function(news) {
            news.createdAt = moment(news.field_release_date.value * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss');
        });

        return res.json(searchNews);
    })
    .catch(next);
};