require('babel-core/register');
require('babel-polyfill');

const debug = require('debug')('NOWapis:test:category');
const request = require('supertest-as-promised');
const api = require('../api.js');

describe('CATEGORY TEST', function() {

    let newsTaxId;
    let photosTaxId;
    let videosTaxId;

    describe('取得新聞 menu 與列表', function() {
        it('GET /category/news', function(done) {
            request(api)
                .get(`/category/news`)
                .then(function(response) {
                    debug('res.body %j', response.body);
                    debug('response length: %s', response.body.length);
                    newsTaxId = response.body[0]._id;
                    return done();
                })
                .catch(done);
        });

        it('GET /category/news/:taxId', function(done) {
            request(api)
                .get(`/category/news/${newsTaxId}`)
                .then(function(response) {
                    debug('res.body %j', response.body);
                    return done();
                })
                .catch(done);
        });
    });

    describe('取得圖集 menu 與列表', function() {
        it('GET /category/photos', function(done) {
            request(api)
                .get(`/category/photos`)
                .then(function(response) {
                    debug('res.body %j', response.body);
                    debug('response length: %s', response.body.length);
                    photosTaxId = response.body[0]._id;
                    return done();
                })
                .catch(done);
        });

        it('GET /category/news/:taxId', function(done) {
            request(api)
                .get(`/category/news/${photosTaxId}`)
                .then(function(response) {
                    debug('res.body %j', response.body);
                    return done();
                })
                .catch(done);
        });
    });

    describe('取得影音 menu 與列表', function() {
        it('GET /category/videos', function(done) {
            request(api)
                .get(`/category/videos`)
                .then(function(response) {
                    debug('res.body %j', response.body);
                    debug('response length: %s', response.body.length);
                    videosTaxId = response.body[0]._id;
                    return done();
                })
                .catch(done);
        });

        it('GET /category/videos/:taxId', function(done) {
            request(api)
                .get(`/category/news/${videosTaxId}`)
                .then(function(response) {
                    debug('res.body %j', response.body);
                    return done();
                })
                .catch(done);
        });
    });
});