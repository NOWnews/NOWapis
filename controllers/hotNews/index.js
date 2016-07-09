import express from 'express';
let router = express.Router();

const hotNews = require('./hotnews');

router.route('/hotNews')
    .get(hotNews);

module.exports = router;