import express from 'express';
let router = express.Router();

router.route('/test')
    .get(function(req, res, next) {
        return res.json({});
    });

module.exports = router;