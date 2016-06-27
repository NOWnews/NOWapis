import express from 'express';
let router = express.Router();

const one = require('./one');

router.route('/news/:nodeId')
    .get(one);

module.exports = router;