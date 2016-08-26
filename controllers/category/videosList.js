
import co from 'co';
import Promise from 'bluebird';
import _ from 'lodash';
import moment from 'moment-timezone';

import redis from '../../redis';
import config from '../../config';

const debug = require('debug')('NOWapis:controller:category:videosList');

module.exports = (req, res, next) => {

    let { taxId } = req.params;
    let { limit, skip, page } = req.query;
    let tids;
    let now = Math.floor(+new Date() / 1000);

    // 因為沒有真正的影音總覽，而是把所有各分類影音 tid 集合查詢
    if(parseInt(taxId) === 8297) {
        tids = [];
        _.forEach(config.videosTids, (item) => {
            if(item.tid !== 8297) {
                tids.push(item.tid);
            }
        });
    }

    co(function*() {

        // 去跟 redis 要資料，有資料直接 response
        if(page === 1) {
            let redisVideosCategories = yield redis.getValue(`videosCategories${taxId}`);
            debug('redisVideosCategories = %j', redisVideosCategories);
            if(redisVideosCategories && redisVideosCategories.length !== 0) {
                return res.json(redisVideosCategories);
            }
        }

        let mongodb14 = yield require('../../mongodb14');

        let conditions = {
            _bundle: 'media',
            'field_type.value': 2,
            'field_release_status.value': 1,
            'field_free_tags.tid': parseInt(taxId, 10)
        };

        // 如果是總覽，則會傳入所有 tid
        if(tids) {
            conditions['field_free_tags.tid'] = { $in: tids };
        }

        let videoNode = yield mongodb14.collection('fields_current.node').find(conditions)
            .sort({ 'field_release_date.value': -1})
            .limit(limit)
            .skip((page - 1) * limit)
            .toArrayAsync();

        // 取得某個 tax 影音的列表頁
        let videosList = yield Promise.map(videoNode, (doc) => {

            let fid = (doc.field_newsfrom_image && doc.field_newsfrom_image.fid) || (doc.field_image && doc.field_image.fid) || (doc.field_media_entity && doc.field_media_entity.fid) || doc.fid;

            // 取得影音列表需要的 youtube 縮圖
            return mongodb14.collection('fields_current.file').findOneAsync({
                    fid: fid
                }, {
                    uri: 1,
                    field_file_image_width: 1,
                    field_file_image_height: 1
                })
                .then((imageData) => {

                    if(!imageData) {
                        return Promise.resolve({
                            nodeId: doc._id,
                            title: doc.title,
                            createdAt: moment(doc.created * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss'),
                            youtubeThumbnail: null
                        });
                    }

                    // console.log(imageData);
                    let matches = imageData.uri.match(/youtube:\/\/v\/(.*)/);
                    let youtubeId = matches[1];
                    let youtubeThumbnail = `${config.youtube.thumbnail}/${youtubeId}/0.jpg`;

                    return Promise.resolve({
                        nodeId: doc._id,
                        title: doc.title,
                        createdAt: moment(doc.created * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss'),
                        youtubeThumbnail: youtubeThumbnail
                    });
                });
        });

        // debug('videoNode = %j', videoNode[0]);
        // debug('images = %j', images);

        // 把資料存入 redis
        if(page === 1) {
            yield redis.setValue(`videosCategories${taxId}`, videosList, 180);
        }

        return res.json(videosList);
    })
    .catch(next);
};