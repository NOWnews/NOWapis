
import config from '../config';

module.exports = (app) => {

    return (req, res, next) => {

        let mode = process.env.NODE_ENV;
        let apiKey = req.header('X-NOWnews-API');

        if(mode === 'production' && (!apiKey || apiKey !== config.header['X-NOWnews-AP'])) {
            return next(new Error('BAD REQUEST'));
        }

        // if(apiKey !== config.header['X-NOWnews-AP']) {
        //     return next(new Error('BAD REQUEST'));
        // }

        return next();
    };
};