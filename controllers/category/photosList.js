
import co from 'co';
import Promise from 'bluebird';
import _ from 'lodash';
// import moment from 'moment-timezone';
import md5 from 'md5';

const debug = require('debug')('NOWapis:controller:category:photosList');
const redis = require('../../redis');
// const libs = require('../../libs');

module.exports = (req, res, next) => {

    // let taxId = parseInt(req.params.taxId, 10);
    let { taxId } = req.params;
    let { limit, skip, page } = req.query;
    let now = Math.floor(+new Date() / 1000);

    co(function*() {

        // 去跟 redis 要資料，有資料直接 response
        if(page === 1) {
            let redisPhotosCategories = yield redis.getValue(`photosCategories${taxId}`);
            debug('redisPhotosCategories = %j', redisPhotosCategories);
            if(redisPhotosCategories && redisPhotosCategories.length !== 0) {
                return res.json(redisPhotosCategories);
            }
        }

        let mongodb14 = yield require('../../mongodb14');

        // 利用 tid 找出關聯的 realtionNodes
        let relationNodes = yield mongodb14.collection('fields_current.relation').find({
                _bundle: 'moderator_picture',
                endpoints: {
                    entity_type: 'taxonomy_term',
                    entity_id: parseInt(taxId, 10),
                    r_index: 1
                },
                'field_release_date.value': {
                    $lte: now
                }, 
                'field_release_status.value': 1
            }, {
                _id: 1,
                endpoints: {
                    $elemMatch: {
                        r_index: 0
                    }
                }
            })
            .sort({
                'field_ra.radioactivity_energy': -1,
                'field_release_date.value': -1
            })
            .limit(limit)
            .skip((page - 1) * limit)
            .toArrayAsync();

        // 將 realtionNodes 內的所有圖集主要 id 撈出來(有排序的)
        let mainNodeIds = _.map(relationNodes, (node) => {
            return node.endpoints[0].entity_id;
        });

        debug('mainNodeIds = %j', mainNodeIds);

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
        // debug('photosNodes = %j', photosNodes);

        // 利用圖集主要的 node 取得需要的資料
        let photosList = yield Promise.map(photosNodes, (photosNode) => {

            // 最後要輸出的檔案
            let result = {
                title: photosNode.title,
                mainNodeId: photosNode._id // 排序用的 node id
            };

            // debug('photosNode = %j', photosNode);

            // 利用圖集主要的 node id 去找出關聯資料，主要是用來找出這個 node 的 file 資料
            return mongodb14.collection('fields_current.relation').find({
                    _bundle: 'media_collection',
                    'endpoints.entity_id': photosNode._id
                }, {
                    'endpoints.entity_id': 1,
                    _id: 0,
                    field_media_title: 1,
                    field_media_description: 1
                })
                .sort({
                    'field_ra.radioactivity_energy': -1,
                    'field_release_date.value': -1
                })
                .limit(1)
                .toArrayAsync()
                .then((docs) => {
                    let nodeIds = _.map(docs, (doc) => {
                        debug('doc = %j', doc);

                        result.cite = doc.field_media_title.value; // 列表主圖圖說

                        let nodeId;
                        _.forEach(doc.endpoints, (obj) => {
                            if(obj.entity_id !== photosNode._id) {
                                nodeId = obj.entity_id;
                                return;
                            }
                        });
                        return nodeId;
                    });

                    return Promise.resolve(nodeIds);
                })
                .then((nodeIds) => {
                    return mongodb14.collection('fields_current.node').findOneAsync({
                            _id: { $in: nodeIds }
                        }, {
                            'field_release_date': 1,
                            'field_media_entity': 1
                        });
                })
                .then((doc) => {
                    // debug('doc = %j', doc);
                    result.nodeId = doc._id; // 圖集主圖的 node id

                    // 拿出 node 裡面的 field_media_entity 拿去找 file
                    return mongodb14.collection('fields_current.file').findOneAsync({
                        fid: doc.field_media_entity.fid
                    }, {
                        uri: 1,
                        field_file_image_width: 1,
                        field_file_image_height: 1
                    });
                })
                .then((imageData) => {
                    // debug('imageData = %j', imageData);

                    // 處理撈出來的 img 資料，這段解密的邏輯是從就佔撈的我懶得研究了
                    let matches = imageData.uri.match(/^hash:\/\/(.*)\.([a-zA-Z0-9]{3,})$/);
                    let ext = matches[2];
                    let name = matches[1];
                    let hash = md5(name + '.' + ext);
                    let imgUrl = 'http://s.nownews.com/' + hash.substr(0, 2) + '/' + hash.substr(2, 2) + '/' + hash + '.' + ext;

                    // result.image.title = imageNode.title;
                    // result.image.description = imageNode.title;
                    // result.uri = imageData.uri;
                    result.thumbnail = 'http://imgapi.nownews.com/?w=640&h=360&q=60&src=' + imgUrl;
                    // result.url = 'http://imgapi.nownews.com/?w=640&q=75&src=' + imgUrl;

                    return Promise.resolve(result);
                });
        });

        // 將 mainNodeId 提出來當 key，要做排序用的
        let formatPhotosList = {};
        _.forEach(photosList, (photo) => {
            formatPhotosList[`nodeId${photo.mainNodeId}`] = photo;
        });

        // 將資料重新排序
        photosList = _.map(mainNodeIds, (mainNodeId) => {
            return formatPhotosList[`nodeId${mainNodeId}`];
        });

        // 把資料存入 redis
        if(page === 1) {
            yield redis.setValue(`photosCategories${taxId}`, photosList, 180);
        }

        return res.json(photosList);
    })
    .catch(next);
};