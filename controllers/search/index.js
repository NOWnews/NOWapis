import express from 'express';
import { Router } from 'express';

let router = Router();

// const newsTitleSearch = require('./newsTitleSearch');
const solr = require('./solr');

router.route('/search')
    .get(solr);

module.exports = router;