
import compression from 'compression';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import baseQuery from './baseQuery';
import parseHeader from './parseHeader';

module.exports = function(app) {

    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    app.use(logger('dev'));

    // 處理 get query limit, skip 的問題
    app.use(baseQuery());

    // 處理 header 相關驗證
    app.use(parseHeader());

    return function(req, res, next) {
        return next();
    };
};