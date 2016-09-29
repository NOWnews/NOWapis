
import config from '../config';

module.exports = (app) => {

    return (req, res, next) => {

        // 如果 router 有在白名單內，就直接 next
        // if(config.headerWhiteList.includes(req.path)) {
        //     return next();
        // }

        let mode = process.env.NODE_ENV;
        let apiKey = req.header('X-NOWnews-API');

        if(mode === 'production' && (!apiKey || !config.header['X-NOWnews-API'].includes(apiKey))) {
            return next(new Error('BAD REQUEST'));
        }

        return next();
    };
};