import express from 'express';
let router = express.Router();

const models = require('../models');
const redis = require('../redis');

router.route('/test')
    .get(function(req, res, next) {
        return res.json({});
    });

module.exports = router;