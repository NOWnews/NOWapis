import express from 'express';
let router = express.Router();

const instant = require('./instant');

router.route('/instant')
    .get(instant);

module.exports = router;