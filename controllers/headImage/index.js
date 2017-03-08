import express from 'express';
import { Router } from 'express';

let router = Router();

import ios from './ios';
import android from './android';
import ipad from './ipad';

router.route('/headimage/ios')
    .get(ios);

router.route('/headimage/android')
    .get(android);

router.route('/headimage/ipad')
    .get(ipad);


module.exports = router;