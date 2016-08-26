
module.exports = (app) => {

    return (req, res, next) => {

        // 如果不是 GET method，就直接跳出
        if(req.method !== 'GET') {
            return next();
        }

        let limit = parseInt(req.query.limit, 10);
        let skip = parseInt(req.query.skip, 10);
        let page = parseInt(req.query.page, 10);

        req.query.limit = Number.isNaN(limit) ? 21 : Math.max(0, limit);
        req.query.skip = Number.isNaN(skip) ? 0 : Math.max(0, skip);
        req.query.page = Number.isNaN(page) ? 1 : Math.max(1, page);

        return next();
    };
};