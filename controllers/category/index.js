import express from 'express';
let router = express.Router();

const category = require('./category');
const newsList = require('./newsList');

router.route('/category')
    .get(category);

router.route('/category/:nodeId/news')
    .get(newsList);

module.exports = router;