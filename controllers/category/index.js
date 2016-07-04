import express from 'express';
let router = express.Router();

const category = require('./category');

router.route('/category')
    .get(category);

module.exports = router;