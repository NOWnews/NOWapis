import express from 'express';
import { Router } from 'express';

let router = Router();

const check = require('./check');

router.route('/check')
    .get(check);

module.exports = router;