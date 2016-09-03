import co from 'co';
import Promise from 'bluebird';

module.exports = co.wrap(function*(news) {

    let mongodb14 = yield require('../mongodb14');

    let query = {
        _bundle: 'news',
        'field_release_date.value': {
            $lt: news.field_release_date.value
        },
        // _id: {
        //     $lt: news._id
        // },
        'field_release_status.value': 1,
    };

    if(news.field_main_category && news.field_main_category.tid) {
        query['field_main_category.tid'] = news.field_main_category.tid;
    }

    let nextNews = yield mongodb14.collection('fields_current.node').find(query, {
            _id: 1,
            title: 1,
            field_short_title: 1
        })
        .sort({'field_release_date.value': -1})
        .limit(1)
        .toArrayAsync()
        .then((docs) => {

            if(!docs || docs.length === 0) {
                return Promise.resolve(null);
            }

            return Promise.resolve(docs[0]);
        });

    return yield Promise.resolve(nextNews);
});