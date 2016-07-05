import express from 'express';
let router = express.Router();

const list = require('./list');
const newsList = require('./newsList');

router.route('/category')
    .get(list);

router.route('/category/:nodeId/news')
    .get(newsList);

module.exports = router;