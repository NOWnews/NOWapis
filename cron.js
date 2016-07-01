require('babel-core/register');
require('babel-polyfill');

const schedule = require('node-schedule');
const Promise = require('bluebird');
const co = require('co');

let cronjobs = require('./cronjobs');

co(function*() {

    // 先讀取一次
    yield cronjobs.updateAllCaches();

    // 再跑 cronjob
    yield new Promise(function(resolve, reject) {
        let uploadXmlJob = schedule.scheduleJob('*/3 * * * *', function(){
            return cronjobs.updateAllCaches();
        });
    });

    // yield cronjobs.updateAllCaches();
})
.catch(function(err) {
    console.log(err);
    return process.exit();
});
