
const debug = require('debug')('NOWapis:libs:getNewsImageFromNodeId');
const co = require('co');
const Promise = require('bluebird');
const md5 = require('md5');
// const config = require('../config');

// const MongoDB = Promise.promisifyAll(require('mongodb'));
// const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

module.exports = co.wrap(function*(news) {

    if(!news) {
        return Promise.reject(new Error('Need News Data'));
    }

    news.image = {};

    // let db = yield MongoClient.connectAsync(config.newsMongoDb);
    let mongodb14 = yield require('../mongodb14');

    let imageRelationNode = yield mongodb14.collection('fields_current.relation').findOneAsync({
            _bundle: 'relation_news_image',
            // _type: 'relation',
            'endpoints.entity_id': news._id
        }, {
            _id: 0,
            'endpoints.entity_id': 1,
            'field_rel_description': 1
        })
        .then(function(node) {
            if(!node || !node.endpoints) {
                return undefined;
            }
            return Promise.resolve({
                nodeId: node.endpoints[1].entity_id,
                desc: node.field_rel_description.value
            });
        });
    // debug('imageRelationNode = %s', imageRelationNode);

    if(!imageRelationNode) {
        return Promise.resolve(news);
    }

    let imageNode = yield mongodb14.collection('fields_current.node').findOneAsync({
            _id: imageRelationNode.nodeId,
            // _bundle: 'media',
            // _type: 'node',
            // 'field_release_status.value': 1,
            // 'field_auth.value': '1',
            // field_media_entity: {
            //     $exists: true
            // }
        });
    // debug('imageNode id = %s', imageNode._id);

    if(!imageNode || !imageNode.field_media_entity) {
        return Promise.resolve(news);
    }

    // debug('imageNode = %j', imageNode);

    let fid = imageNode.field_media_entity.fid;

    let imageData = yield mongodb14.collection('fields_current.file').findOneAsync({
            // _bundle: 'image',
            // _type: 'file',
            fid: fid
        }, {
            uri: 1,
            field_file_image_width: 1,
            field_file_image_height: 1
        });
    // debug('imageData = %j', imageData);

    if(!imageData) {
        return Promise.resolve(news);
    }

    // 這段解密的邏輯是從就佔撈的我懶得研究了
    let matches = imageData.uri.match(/^hash:\/\/(.*)\.([a-zA-Z0-9]{3,})$/);
    let ext = matches[2];
    let name = matches[1];
    let hash = md5(name + '.' + ext);
    let imgUrl = 'http://s.nownews.com/' + hash.substr(0, 2) + '/' + hash.substr(2, 2) + '/' + hash + '.' + ext;

    // 下載圖片，帶入 url, 資料夾位置， 檔案名稱
    // let imageInfo = yield downloadImage(imgUrl, __dirname + '/newsImages', hash + '.' + ext);

    news.image.title = imageNode.title || imageRelationNode.desc;
    news.image.description = imageRelationNode.desc || imageNode.title;
    news.image.uri = imageData.uri;
    news.image.originImage = imgUrl;
    news.image.thumbnail = 'https://imgapi.nownews.com/?w=640&h=360&q=60&src=' + imgUrl;
    // news.image.fileName = imageInfo.fileName;
    news.image.url = 'https://imgapi.nownews.com/?w=640&q=75&src=' + imgUrl;
    // debug('news = %j', news);
    // debug('news id = %s', news._id);
    // yield db.closeAsync();
    return yield Promise.resolve(news);
});