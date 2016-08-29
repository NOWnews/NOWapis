
const debug = require('debug')('NOWapis:controller:search:solr');

import co from 'co';
import Promise from 'bluebird';
import moment from 'moment-timezone';
import _ from 'lodash';
import request from 'request-promise';

import libs from '../../libs';
import config from '../../config';

const concurrency = 10;

module.exports = (req, res, next) => {

    let { keyword, type, limit, page } = req.query;
    let offset = (page - 1) * limit;
    // let fq = ['bundle:news'];
    // console.log(decodeURI(keyword));
    co(function*() {

        let options = {
            uri: `http://${config.solr.host}:${config.solr.port}/${config.solr.path}/${config.solr.core}/select`,
            qs: {
                q: decodeURI(keyword),
                fq: 'bundle:news',
                start: offset,
                rows: limit,
                fl: 'entity_id',
                wt: 'json',
                explainOther: '',
                'hl.fl': 0,
                sort: 'its_field_release_date desc'
            },
            json: true
        };

        let solrData = yield request(options);

        if(!solrData || !solrData.response || solrData.response.docs.length === 0) {
            return res.json([]);
        }

        let nodeIds = _.map(solrData.response.docs, (doc) => {
            return doc.entity_id;
        });

        let mongodb14 = yield require('../../mongodb14');

        let nowEposh = parseInt(moment(Date.now()).format('X'), 10);

        let newsData = yield mongodb14.collection('fields_current.node').find({
                _id: { $in: nodeIds },
                'field_release_date.value': { $lte: nowEposh },
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
            .toArrayAsync();

        // 找出圖片
        newsData = yield Promise.map(newsData, function(news) {
            return libs.getImageFromNews(news);
        });

        // 找尋新聞分類
        newsData = yield Promise.map(newsData, function(news) {
            return libs.findNewsMainCategory(news);
        }, { concurrency: concurrency });

        // 時間正規化
        _.map(newsData, function(news) {
            news.createdAt = moment(news.field_release_date.value * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss');
        });

        return res.json({
            keyword: keyword,
            newsList: newsData
        });
    })
    .catch(next);
};