import express from 'express';
let router = express.Router();

const hotNews = require('./hotNews');

router.route('/hotNews')
    .get(hotNews);

module.exports = router;