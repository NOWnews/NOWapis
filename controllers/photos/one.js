
const debug = require('debug')('NOWapis:controller:photos:one');

import co from 'co';
import Promise from 'bluebird';
import md5 from 'md5';
import _ from 'lodash';
import moment from 'moment';

import config from '../../config';

module.exports = (req, res, next) => {

    let { nodeId } = req.params;
    let now = Math.floor(+new Date() / 1000);

    co(function*() {

        let mongodb14 = yield require('../../mongodb14');

        let photoAlbum = yield mongodb14.collection('fields_current.node').findOneAsync({
            _id: parseInt(nodeId, 10)
        });

        // debug('photoAlbum = %j', photoAlbum);

        if(!photoAlbum) {
            return yield Promise.reject(new Error('找不到這個圖集'));
        }

        let fid = photoAlbum.field_media_entity.fid;

        // 這個圖集的主要圖片
        let mainImage = yield mongodb14.collection('fields_current.file').findOneAsync({
                fid: fid
            }, {
                uri: 1,
                field_file_image_width: 1,
                field_file_image_height: 1
            })
            .then((imageData) => {

                // 處理撈出來的 img 資料，這段解密的邏輯是從就佔撈的我懶得研究了
                let matches = imageData.uri.match(/^hash:\/\/(.*)\.([a-zA-Z0-9]{3,})$/);
                let ext = matches[2];
                let name = matches[1];
                let hash = md5(name + '.' + ext);
                let imgUrl = 'http://s.nownews.com/' + hash.substr(0, 2) + '/' + hash.substr(2, 2) + '/' + hash + '.' + ext;

                // result.image.title = imageNode.title;
                // result.image.description = imageNode.title;
                // result.uri = imageData.uri;
                // result.thumbnail = 'http://imgapi.nownews.com/?w=640&q=60&src=' + imgUrl;
                // result.url = 'http://imgapi.nownews.com/?w=640&q=75&src=' + imgUrl;
                return Promise.resolve({
                    uri: imageData.uri,
                    image: 'http://imgapi.nownews.com/?w=640&q=75&src=' + imgUrl,
                    originImage: imgUrl
                });
            });

        let result = {};
        let sortedCompardIds; // 用來做排序比對的陣列

        // 找出這個圖集主要的 collection id
        let collectionId = yield mongodb14.collection('fields_current.relation').findOneAsync({
                _bundle: 'media_collection',
                'endpoints.entity_id': photoAlbum._id
            }, {
                _id: 0,
                'endpoints.entity_id': 1,
                'field_rel_description': 1
            })
            .then((doc) => {
                let collectionId;
                _.forEach(doc.endpoints, (endpoint) => {
                    if(endpoint.entity_id !== photoAlbum._id) {
                        collectionId = endpoint.entity_id;
                        return;
                    }
                });

                return Promise.resolve(collectionId);
            });
        debug('collectionId = %s', collectionId);

        // 用 collection id 去找出這個圖集所有的圖片
        let photosCollections = yield mongodb14.collection('fields_current.relation').find({
                _bundle: 'media_collection',
                'endpoints.entity_id': collectionId
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
            .limit(30)
            .toArrayAsync()
            .then((docs) => {
                // debug('docs = %j', docs);
                // console.log(docs);
                let nodeIds = []; // 已經經過排序
                _.forEach(docs, (doc) => {
                    _.forEach(doc.endpoints, (endpoint) => {
                        if(endpoint.entity_id !== collectionId) {
                            nodeIds.push(endpoint.entity_id);

                            result[endpoint.entity_id] = {
                                nodeId: endpoint.entity_id,
                                cite: doc.field_media_title.value
                            };
                            return;
                        }
                    });
                });
                return Promise.resolve(nodeIds);
            })
            .then((nodeIds) => {

                sortedCompardIds = nodeIds;

                return mongodb14.collection('fields_current.node').find({
                    _id: { $in: nodeIds }
                }, {
                    field_release_date: 1,
                    field_media_entity: 1
                })
                .toArrayAsync();
            })
            .then((fileNodes) => {
                // debug('fileNodes = %j', fileNodes);

                // 去除掉沒有 fid 的選項
                fileNodes = _.filter(fileNodes, function(fileNode) {
                    return fileNode.field_media_entity;
                });

                return Promise.map(fileNodes, (fileNode) => {
                    return mongodb14.collection('fields_current.file').findOneAsync({
                            fid: fileNode.field_media_entity.fid
                        }, {
                            uri: 1,
                            field_file_image_width: 1,
                            field_file_image_height: 1
                        })
                        .then((imageData) => {
                            // debug('imageData = %j', imageData);
                            let matches = imageData.uri.match(/^hash:\/\/(.*)\.([a-zA-Z0-9]{3,})$/);
                            let ext = matches[2];
                            let name = matches[1];
                            let hash = md5(name + '.' + ext);
                            let imgUrl = 'http://s.nownews.com/' + hash.substr(0, 2) + '/' + hash.substr(2, 2) + '/' + hash + '.' + ext;

                            result[fileNode._id].fileNodeId = fileNode._id;
                            result[fileNode._id].thumbnail = 'http://imgapi.nownews.com/?w=640&q=60&src=' + imgUrl;
                            result[fileNode._id].url = 'http://imgapi.nownews.com/?w=640&q=75&src=' + imgUrl;

                            return Promise.resolve({
                                thumbnail: 'http://imgapi.nownews.com/?w=640&q=60&src=' + imgUrl,
                                image: 'http://imgapi.nownews.com/?w=640&q=75&src=' + imgUrl
                            });
                        });
                });
            })
            .then((images) => {
                // debug('images = %j', images);
                return Promise.resolve(images);
            });

        // 重新排序圖集資料
        let sortedCollectionImages = _.map(sortedCompardIds, (nodeId) => {
            return result[nodeId];
        });

        // 找出這個圖集的 taxIds
        let photosTids = yield mongodb14.collection('fields_current.relation').find({
                _bundle: 'moderator_picture',
                'endpoints.entity_id': collectionId
            })
            .toArrayAsync()
            .then((docs) => {
                let taxIds = _.map(docs, (doc) => {
                    let taxId;
                    _.forEach(doc.endpoints, (endpoint) => {
                        if(endpoint.entity_type === 'taxonomy_term') {
                            taxId = endpoint.entity_id;
                            return;
                        }
                    });

                    return taxId;
                });
                return Promise.resolve(taxIds);
            });

        let configPhotosTids = _.map(config.photosTids, (photoData) => {
            return photoData.tid;
        });

        // 只有取在 config 有的 taxId
        photosTids = _.intersection(photosTids, configPhotosTids);

        // debug('photosTids = %j', photosTids);

        // 利用 taxId 找出此圖集的分類
        let photoCategory = yield mongodb14.collection('fields_current.taxonomy_term').find({
                _id: { $in: photosTids }
            }, {
                _id: 1,
                name: 1
            })
            .toArrayAsync();

        // 組成 JSON-LD 要用資料
        let jsonld = {
            context: 'http://schema.org',
            type: 'NewsArticle',
            datePublished: moment(photoAlbum.created * 1000).tz('Asia/Taipei').format('YYYY-MM-DDTHH:mm:ss+08:00'),
            dateModified: moment(photoAlbum.changed * 1000).tz('Asia/Taipei').format('YYYY-MM-DDTHH:mm:ss+08:00'),
            mainEntityOfPage: {
                type: 'WebPage',
                id: `http://m.nownews.com/photo/${photoAlbum._id}`
            },
            articleBody: photoAlbum.body.value || photoAlbum.title,
            headline: photoAlbum.title,
            image: {
                type: 'ImageObject',
                url: mainImage.image,
                width: 640,
                height: 360
            },
            author: {
                type: 'Person',
                name: photoAlbum.author || 'NOWnews 今日新聞'
            },
            publisher: {
                type: 'Organization',
                name: 'NOWnews 今日新聞',
                logo: {
                    type: 'ImageObject',
                    url: 'http://www.nownews.com/assets/images/logo.png',
                    width: 220,
                    height: 52
                }
            },
            description: photoAlbum.body.value || photoAlbum.title
        };

        // debug('photoCategory = %j', photoCategory);
        // debug('photosCollections = %j', photosCollections);
        // debug('result = %j', result);

        return res.json({
            nodeId: photoAlbum._id,
            cite: photoAlbum.title,
            title: photoAlbum.title,
            url: `/p/${moment(photoAlbum.created * 1000).tz('Asia/Taipei').format('YYYY/MM/DD')}/${photoAlbum._id}`,
            created: photoAlbum.created,
            createdAt: moment(photoAlbum.created * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss'),
            mainImage: mainImage.image,
            collectionImages: sortedCollectionImages,
            categories: photoCategory,
            jsonld: jsonld
        });
    })
    .catch(next);
};