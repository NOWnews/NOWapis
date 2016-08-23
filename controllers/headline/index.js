import express from 'express';
let router = express.Router();

const headline = require('./headline');

router.route('/news/headline')
    .get(headline);

module.exports = router;