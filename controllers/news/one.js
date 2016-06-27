import co from 'co';
import Promise from 'bluebird';
import mongodb from 'mongodb';
import moment from 'moment-timezone';

const config = require('../../config');
const libs = require('../../libs');

const MongoDB = Promise.promisifyAll(mongodb);
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

module.exports = function(req, res, next) {

    let nodeId = parseInt(req.params.nodeId, 10);

    co(function*(){

        let db = yield MongoClient.connectAsync(config.newsMongoDb);

        let news = yield db.collection('fields_current.node').findOne({
            _id: nodeId,
            'field_release_status.value': 1
        }, {
            _id: 1,
            title: 1,
            created: 1,
            changed: 1,
            body: 1,
            field_adult: 1,
            field_authors: 1,
            field_free_body: 1,
            // field_free_tags: 1,
            field_news_ref: 1,
            field_newsby: 1,
            field_short_title: 1,
        });

        if(!news) {
            return Promise.reject(new Error(`找不到這個新聞， nodeId = ${nodeId}`));
        }

        let results = libs.parseHtml(news.body.value);

        let videos = libs.getVideos(news.field_free_body.value);

        let outputNews = {
            nodeId: news._id,
            title: news.body.summary,
            summary: news.title,
            shortTitle: (news.field_short_title && news.field_short_title.value) || '',
            created: news.created,
            changed: news.changed,
            createdAt: moment(news.created * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: moment(news.changed * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss'),
            htmlBody: news.body.value,
            videos: videos,
            mobileBody: results,
            freeBody: (news.field_free_body && news.field_free_body.value) || '',
            author: (news.field_newsby && news.field_newsby.value) || '',
            adult: (news.field_adult && news.field_adult.value) || '0'
        };

        // news.mobileBody = results;

        res.status(200);
        return res.json(outputNews);
        // return res.json(news);
    })
    .catch(next);
};