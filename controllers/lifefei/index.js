import express from 'express';
import { Router } from 'express';

let router = Router();

const channels = require('./channels');

router.route('/lifefei/channels')
    .get(channels);

module.exports = router;