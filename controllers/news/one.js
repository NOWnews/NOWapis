import co from 'co';
import Promise from 'bluebird';
import moment from 'moment-timezone';

const debug = require('debug')('NOWapis:controller:news:one');
import libs from '../../libs';
import redis from '../../redis';

module.exports = function(req, res, next) {

    let nodeId = parseInt(req.params.nodeId, 10);

    co(function*(){

        // 先去 redis 要資料，看這篇新聞有沒有 cache
        let redisNews = yield redis.getValue(`news${nodeId}`);
        debug('redisNews = %j', redisNews);
        if(redisNews && redisNews.length !== 0) {
            return res.json(redisNews);
        }

        let mongodb14 = yield require('../../mongodb14');

        let news = yield mongodb14.collection('fields_current.node').findOneAsync({
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
            field_main_category: 1,
            field_release_date: 1,
            field_news_ref: 1,
            field_newsby: 1,
            field_short_title: 1,
        });

        if(!news) {
            return Promise.reject(new Error(`找不到這個新聞， nodeId = ${nodeId}`));
        }

        // 找尋新聞首圖
        yield libs.getImageFromNews(news);
        // debug('image = %j', news.image);

        // 將新聞內文的圖片都加上 image api
        news.body.value = libs.addImageApi(news.body.value);

        let results = libs.parseHtml(news.body.value);

        let videos = [];
        if(news.field_free_body) {
            videos = libs.getVideos(news.field_free_body.value);
        }

        let outputNews = {
            nodeId: news._id,
            title: news.title,
            shortTitle: (news.field_short_title && news.field_short_title.value) || '',
            url: `/n/${moment(news.created * 1000).tz('Asia/Taipei').format('YYYY/MM/DD')}/${news._id}`,
            image: news.image,
            summary: news.body.summary,
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
        debug('outputNews = %j', outputNews);

        // 找出上一篇新聞，下一篇新聞，新聞主分類
        let other = yield [
            libs.prevNews(news),
            libs.nextNews(news),
            libs.findNewsMainCategory(news)
        ];

        let refNews = [];
        if(news.field_news_ref) {
            refNews = yield Promise.map(news.field_news_ref, (doc) => {
                let newsId = doc.target_id;
                return mongodb14.collection('fields_current.node').findOneAsync({
                        _id: newsId
                    }, {
                        title: 1,
                        'field_main_category': 1
                    })
                    .then((news) => {
                        return libs.getImageFromNews(news);
                    })
                    .then((news) => {
                        return libs.findNewsMainCategory(news);
                    });
                });
        }

        debug('other = %j', other);

        outputNews.prev = other[0];
        outputNews.next = other[1];
        outputNews.category = other[2].category;
        outputNews.refNews = refNews;

        // 組成 JSON-LD 要用資料
        let jsonld = {
            context: 'http://schema.org',
            type: 'NewsArticle',
            datePublished: moment(news.created * 1000).tz('Asia/Taipei').format('YYYY-MM-DDTHH:mm:ss+08:00'),
            dateModified: moment(news.changed * 1000).tz('Asia/Taipei').format('YYYY-MM-DDTHH:mm:ss+08:00'),
            mainEntityOfPage: {
                type: 'WebPage',
                id: `http://m.nownews.com/news/${news._id}`
            },
            articleBody: news.body.summary || news.title,
            headline: news.title,
            image: {
                type: 'ImageObject',
                url: news.image.url,
                width: 640,
                height: 360
            },
            author: {
                type: 'Person',
                name: news.author || 'NOWnews 今日新聞'
            },
            publisher: {
                type: 'Organization',
                name: 'NOWnews 今日新聞',
                logo: {
                    'type': 'ImageObject',
                    url: 'http://www.nownews.com/assets/images/logo.png',
                    width: 220,
                    height: 52
                }
            },
            description: news.body.summary || news.title
        };

        outputNews.jsonld = jsonld;

        // 把這篇新聞存進 redis
        yield redis.setValue(`news${nodeId}`, outputNews, 180);

        res.status(200);
        return res.json(outputNews);
    })
    .catch(next);
};