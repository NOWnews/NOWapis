import express from 'express';
import { Router } from 'express';

let router = Router();

const one = require('./one');
// const newest = require('./newest');

// router.route('/news/newest')
//     .get(newest);

router.route('/photos/:nodeId')
    .get(one);

module.exports = router;