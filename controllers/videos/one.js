const debug = require('debug')('NOWapis:controller:videos:one');

import co from 'co';
import Promise from 'bluebird';
import moment from 'moment-timezone';
import config from '../../config';

module.exports = (req, res, next) => {

    let { nodeId } = req.params;

    co(function*() {

        let mongodb14 = yield require('../../mongodb14');

        // 找出這個 video node
        let video = yield mongodb14.collection('fields_current.node').findOneAsync({
            _id: parseInt(nodeId, 10),
            'field_release_status.value': { $gt: 0 }
        }, {
            title: 1,
            body: 1,
            created: 1,
            changed: 1,
            field_newsfrom_image: 1,
            field_image: 1,
            field_media_entity: 1,
            fid: 1
        });

        debug('video = %j', video);

        if(!video) {
            return yield Promise.reject(new Error('找不到這個影音'));
        }

        // 找出 video 的 fid
        let fid = (video.field_newsfrom_image && video.field_newsfrom_image.fid) || (video.field_image && video.field_image.fid) || (video.field_media_entity && video.field_media_entity.fid) || video.fid;

        // 處理這個 video 的 youtube 資料
        let videoYoutubeInfo = yield mongodb14.collection('fields_current.file').findOneAsync({
                fid: fid
            }, {
                uri: 1,
                field_file_image_width: 1,
                field_file_image_height: 1
            })
            .then((imageData) => {

                let matches = imageData.uri.match(/youtube:\/\/v\/(.*)/);
                let youtubeId = matches[1];
                let url = `${config.youtube.thumbnail}/${youtubeId}/0.jpg`;
                let embed = `${config.youtube.embed}/${youtubeId}`;

                return Promise.resolve({
                    youtubeThumbnail: url,
                    youtubeId: youtubeId,
                    embed: embed
                });
            });

        video.image = videoYoutubeInfo.youtubeThumbnail;
        video.youtubeId = videoYoutubeInfo.youtubeId;
        video.src = videoYoutubeInfo.embed;
        video.createdAt = moment(video.created * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss');

        return res.json(video);
    })
    .catch(next);
};