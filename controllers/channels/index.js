import express from 'express';
let router = express.Router();

const menu = require('./menu');
const newsList = require('./newsList');

router.route('/channels/news')
    .get(menu);

router.route('/channels/news/:nodeId')
    .get(newsList);

module.exports = router;