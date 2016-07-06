
import co from 'co';
import Promise from 'bluebird';
import moment from 'moment-timezone';

const redis = require('../redis');
const updateChannelsMenu = require('./updateChannelsMenu');
const updateChannelsNews = require('./updateChannelsNews');
const updateCategory = require('./updateCategory');
const updateCategoryNews = require('./updateCategoryNews');
const updateHeadline = require('./updateHeadline');
const updateInstant = require('./updateInstant');

module.exports = co.wrap(function*() {

    console.log(`Update Redis Data At ${moment().tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss')}`);

    yield redis.client.flushallAsync();

    yield updateInstant();

    let headline = yield updateHeadline();
    console.log('Update headline Complete.');

    let categories = yield updateCategory();
    console.log('Update Category Menu Complete.');

    let categoryNews = yield updateCategoryNews();
    console.log('Update Category News Complete.');

    let channelsMenu = yield updateChannelsMenu();
    console.log('Update Channels Menu Complete.');

    let channelsNews = yield updateChannelsNews();
    console.log('Update Channels News Complete.');

    console.log(`Finish Update Redis Data At ${moment().tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss')}`);
    console.log('--------------------------');
    return Promise.resolve({});
});