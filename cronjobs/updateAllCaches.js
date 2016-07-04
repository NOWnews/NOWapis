
import co from 'co';
import Promise from 'bluebird';
import moment from 'moment-timezone';

const updateChannelsMenu = require('./updateChannelsMenu');
const updateChannelsNews = require('./updateChannelsNews');
const updateCategory = require('./updateCategory');

module.exports = co.wrap(function*() {

    let categories = yield updateCategory();
    console.log('Update Category Complete.');

    let channelsMenu = yield updateChannelsMenu();
    console.log('Update Channels Menu Complete.');

    let channelsNews = yield updateChannelsNews();
    // console.log(channelsNews);
    console.log('Update Channels News Complete.');

    console.log(`Update All Data At ${moment().tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss')}`);
    console.log('--------------------------');
    return Promise.resolve({});
});