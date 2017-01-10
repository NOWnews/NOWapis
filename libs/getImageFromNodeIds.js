
const debug = require('debug')('NOWapis:libs:getNewsImageFromNodeId');
const co = require('co');
const Promise = require('bluebird');
const md5 = require('md5');
const _ = require('lodash');
// const config = require('../config');

// const MongoDB = Promise.promisifyAll(require('mongodb'));
// const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

let formatUrl = function(file) {

    let image = {};

    // 這段解密的邏輯是從就佔撈的我懶得研究了
    let matches = imageData.uri.match(/^hash:\/\/(.*)\.([a-zA-Z0-9]{3,})$/);
    let ext = matches[2];
    let name = matches[1];
    let hash = md5(name + '.' + ext);
    let imgUrl = 'http://s.nownews.com/' + hash.substr(0, 2) + '/' + hash.substr(2, 2) + '/' + hash + '.' + ext;

    // 下載圖片，帶入 url, 資料夾位置， 檔案名稱
    // let imageInfo = yield downloadImage(imgUrl, __dirname + '/newsImages', hash + '.' + ext);

    news.image.title = imageNode.title;
    news.image.description = imageNode.title;
    news.image.uri = imageData.uri;
    news.image.url = 'https://imgapi.nownews.com/?w=1280&q=70&src=' + imgUrl;
};

module.exports = co.wrap(function*(nodeIds) {

    // let db = yield MongoClient.connectAsync(config.newsMongoDb);
    let mongodb14 = yield require('../mongodb14');

    let newsRelations = yield mongodb14.collection('fields_current.relation').find({
            _bundle: 'relation_news_image',
            // _type: 'relation',
            'endpoints.entity_id': { $in: nodeIds }
        }, {
            _id: 0,
            'endpoints.entity_id': 1,
            'field_rel_description': 1
        })
        .toArrayAsync()
        .then(function(nodes) {
            let obj = {};
            _.forEach(nodes, function(node) {
                obj[node.endpoints[0].entity_id] = node.endpoints[1].entity_id;
            });
            return Promise.resolve(obj);
        });
    debug('newsRelations = %j', newsRelations);

    let imageNodeIds = _.map(newsRelations, function(value) {
        return value;
    });
    debug('imageNodeIds = %j', imageNodeIds);

    let imageNodes = yield mongodb14.collection('fields_current.node').find({
            _id: { $in: imageNodeIds }
        })
        .toArrayAsync();
    debug('imageNodes = %j', imageNodes);

    let imageData = yield Promise.map(imageNodes, function(node) {
        return mongodb14.collection('fields_current.file').findOneAsync({
            // _bundle: 'image',
            // _type: 'file',
            fid: node.field_media_entity.fid
        }, {
            uri: 1,
            field_file_image_width: 1,
            field_file_image_height: 1
        })
        .then(function(file) {
            return Promise.resolve({
                title: node.title,
                description: node.title,
                uri: file.uri
            });
        });
    });
    debug('imageData = %j', imageData);

    // yield db.closeAsync();
    return yield Promise.resolve({});
});