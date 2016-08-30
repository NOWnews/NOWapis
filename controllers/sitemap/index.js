import express from 'express';
import { Router } from 'express';

let router = Router();

const google = require('./google');

router.route('/sitemap/google')
    .get(google);

module.exports = router;