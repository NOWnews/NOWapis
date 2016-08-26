
import compression from 'compression';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import baseQuery from './baseQuery';

module.exports = function(app) {

    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    app.use(logger('dev'));

    // 處理 get query limit, skip 的問題
    app.use(baseQuery());

    return function(req, res, next) {
        return next();
    };
};