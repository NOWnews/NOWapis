import express from 'express';
let router = express.Router();

const menu = require('./menu');
const newsList = require('./newsList');

router.route('/channels/menu')
    .get(menu);

router.route('/channels/:nodeId/news')
    .get(newsList);

module.exports = router;