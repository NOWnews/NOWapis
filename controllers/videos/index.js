import express from 'express';
import { Router } from 'express';

let router = Router();

const one = require('./one');

router.route('/videos/:nodeId')
    .get(one);

module.exports = router;