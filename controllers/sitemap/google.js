import co from 'co';
import Promise from 'bluebird';
import moment from 'moment-timezone';
import _ from 'lodash';

import config from '../../config';
// import request from 'request-promise';

module.exports = (req, res, next) => {

    let now = moment(Date.now()).format('X');
    let lastDay = moment(Date.now()).add('day', -1).format('X');

    let start = parseInt(now, 10);
    let end = parseInt(lastDay, 10);

    let photosTids = _.map(config.photosTids, (item) => {
        return item.tid;
    });

    let videosTids = _.map(config.videosTids, (item) => {
        return item.tid;
    });

    co(function*() {

        let mongodb14 = yield require('../../mongodb14');
        let allNodeIds = [];

        // 取得新聞 ids
        let newsList = yield mongodb14.collection('fields_current.node').find({
                _bundle: 'news',
                'field_release_status.value': 1,
                $and: [
                    { 'field_release_date.value': { $lte: start } },
                    { 'field_release_date.value': { $gte: end } }
                ]
            }, {
                _id: 1
            })
            .toArrayAsync();

        let newsIds = _.map(newsList, (news) => {
            return news._id;
        });

        /*
         * TODO: 圖集
         */


        /*
         * TODO: 影音
         */

        allNodeIds = allNodeIds.concat(newsIds);

        let allNodes = yield mongodb14.collection('fields_current.node').find({
                _id: { $in: allNodeIds }
            }, {
                _id: 1,
                field_type: 1,
                changed: 1
            })
            .sort({
                _id: -1
            })
            .toArrayAsync();

        let urls = _.map(allNodes, (news) => {

            let obj = {};

            if(!news.field_type) {
                obj.url = `http://m.nownews.com/news/${news._id}`;
            }

            if(news.field_type && news.field_type.value === 1) {
                obj.url = `http://m.nownews.com/photos/${news._id}`;
            }

            if(news.field_type && news.field_type.value === 2) {
                obj.url = `http://m.nownews.com/videos/${news._id}`;
            }

            obj.changefreq = 'daily';
            obj.priority = 1;
            obj.lastmod = moment(news.changed * 1000).format('YYYY-MM-DD');

            return obj;
        });

        return res.json(urls);
    })
    .catch(next);
};