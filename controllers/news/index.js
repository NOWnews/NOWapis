import express from 'express';
let router = express.Router();

const one = require('./one');
const newest = require('./newest');

router.route('/news/newest')
    .get(newest);

router.route('/news/:nodeId')
    .get(one);

module.exports = router;