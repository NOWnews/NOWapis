import express from 'express';
let router = express.Router();

const list = require('./list');

router.route('/nearByNews')
    .get(list);

module.exports = router;