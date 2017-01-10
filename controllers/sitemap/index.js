import express from 'express';
import { Router } from 'express';

let router = Router();

const google = require('./google');
const googleSSL = require('./googleSSL');

router.route('/sitemap/google')
    .get(google);

router.route('/sitemap/googleSSL')
    .get(googleSSL);

module.exports = router;