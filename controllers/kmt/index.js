import express from 'express';
import { Router } from 'express';

let router = Router();

const chairman2017 = require('./chairman2017');

router.route('/kmt/chairman2017')
    .get(chairman2017);

module.exports = router;