import express from 'express';
import { Router } from 'express';

let router = Router();

const newsTitleSearch = require('./newsTitleSearch');

router.route('/search')
    .get(newsTitleSearch);

module.exports = router;