import co from 'co';
import moment from 'moment-timezone';
import _ from 'lodash';

const debug = require('debug')('NOWapis:controller:news:newest');

module.exports = function(req, res, next) {

    co(function*(){

        let mongodb14 = yield require('../../mongodb14');

        let newestNews = yield mongodb14.collection('fields_current.node').find({
                _bundle: 'news',
                'field_release_status.value': 1
            })
            .sort({'field_release_date.value': -1})
            .limit(10)
            .toArrayAsync();

        debug('newestNews = %j', newestNews);

        let nodeIds = _.map(newestNews, function(news) {
            let time = moment(news.created * 1000).format('YYYY/MM/DD');
            return `http://www.nownews.com/n/${time}/${news._id}`;
        });

        res.status(200);
        return res.json(nodeIds);
    })
    .catch(next);
};