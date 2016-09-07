import co from 'co';
import Promise from 'bluebird';
import moment from 'moment-timezone';
import _ from 'lodash';

import config from '../../config';

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
         * 圖集資料
         */
        let relationNodes = yield mongodb14.collection('fields_current.relation').find({
                _bundle: 'moderator_picture',
                $and: [
                    { 'field_release_date.value': { $lte: start } },
                    { 'field_release_date.value': { $gte: end } }
                ],
                'field_release_status.value': 1
            }, {
                _id: 1,
                endpoints: {
                    $elemMatch: {
                        r_index: 0
                    }
                }
            })
            .toArrayAsync();

        // 將 realtionNodes 內的所有圖集主要 id 撈出來(有排序的)
        let mainNodeIds = _.map(relationNodes, (node) => {
            return node.endpoints[0].entity_id;
        });

        // 找出圖集列表，每一個圖集的主要 node
        let photosNodes = yield mongodb14.collection('fields_current.node').find({
                _id: { $in: mainNodeIds }
            }, {
                _id: 1,
                title: 1,
                _bundle: 1,
                field_node: 1,
                field_release_date: 1,
                field_type: 1,
                field_today_pv: 1
            })
            .toArrayAsync();

        let photosAllIds = _.map(photosNodes, (node) => {
            return node._id;
        });

        // 找出所有圖片的 node ids
        let photoIds = yield mongodb14.collection('fields_current.relation').find({
                _bundle: 'media_collection',
                'endpoints.entity_id': { $in: photosAllIds }
            }, {
                'endpoints.entity_id': 1,
                _id: 0,
                field_media_title: 1,
                field_media_description: 1
            })
            .toArrayAsync()
            .then((docs) => {

                let nodeIds = [];
                _.forEach(docs, (doc) => {
                    _.forEach(doc.endpoints, (obj) => {
                        if(!photosAllIds.includes(obj.entity_id)) {
                            nodeIds.push(obj.entity_id);
                            return;
                        }
                    });
                });

                return Promise.resolve(nodeIds);
            });

        /*
         * 影音資料
         */
        let videoList = yield mongodb14.collection('fields_current.node').find({
                _bundle: 'media',
                'field_type.value': 2,
                'field_release_status.value': 1,
                $and: [
                    { 'field_release_date.value': { $lte: start } },
                    { 'field_release_date.value': { $gte: end } }
                ]
            }, {
                _id: 1
            })
            .toArrayAsync();

        let videoIds = _.map(videoList, (node) => {
            return node._id;
        });

        // 把所有 id 存到 allNodeIds 裡面
        let allNodeIds = [].concat(newsIds).concat(photoIds).concat(videoIds);


        // 把所有的 id 都拿進去查一遍
        let allNodes = yield mongodb14.collection('fields_current.node').find({
                _id: { $in: allNodeIds }
            }, {
                _id: 1,
                field_type: 1,
                changed: 1
            })
            .sort({
                'field_release_date.value': -1
            })
            .toArrayAsync();

        let urls = _.map(allNodes, (news) => {

            let obj = {};

            if(!news.field_type) {
                obj.url = `http://m.nownews.com/news/${news._id}`;
            }

            if(news.field_type && news.field_type.value === 1) {
                obj.url = `http://m.nownews.com/photo/${news._id}`;
            }

            if(news.field_type && news.field_type.value === 2) {
                obj.url = `http://m.nownews.com/video/${news._id}`;
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