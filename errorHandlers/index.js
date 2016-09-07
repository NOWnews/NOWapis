
import chalk from 'chalk';
import prettyError from 'pretty-error';

let pe = new prettyError();

module.exports = function(app) {

    app.use(function(err, req, res, next) {

        // let errObject = {
        //     message: err.message,
        //     stack: err.stack.split('\n')
        // };

        console.log(chalk.red(chalk.bold('-------------- ERROR --------------')));
        console.log(pe.render(err));
        console.log(chalk.red(chalk.bold('-------------- ERROR --------------')));

        res.status(400);
        return res.json({
            message: 'System is busy, please reload or try later'
        });
    });

    return function(req, res, next) {
        return next();
    };
};