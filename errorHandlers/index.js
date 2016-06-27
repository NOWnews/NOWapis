
module.exports = function(app) {

    app.use(function(err, req, res, next) {
        var errObject = {
            message: err.message,
            stack: err.stack.split('\n')
        };

        console.log('-------------- ERROR --------------');
        console.log(errObject);
        console.log('-------------- ERROR --------------');

        res.status(400);
        return res.json(errObject);
    });

    return function(req, res, next) {
        return next();
    };
};