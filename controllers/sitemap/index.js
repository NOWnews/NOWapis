import express from 'express';
import { Router } from 'express';

let router = Router();

const google = require('./google');
const googleSSL = require('./googleSSL');
const newsSitemap = require('./newsSitemap');

router.route('/sitemap/google')
    .get(google);

router.route('/sitemap/googleSSL')
    .get(googleSSL);

router.route('/sitemap/newsSitemap')
    .get(newsSitemap);

module.exports = router;