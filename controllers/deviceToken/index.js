import express from 'express';
import { Router } from 'express';

let router = Router();

import deviceToken from './deviceToken';

router.route('/deviceToken')
    .get(deviceToken);

module.exports = router;