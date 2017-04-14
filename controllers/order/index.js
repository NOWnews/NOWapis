import express from 'express';
import { Router } from 'express';

let router = Router();

const qrcode = require('./qrcode');

router.route('/orders/qrcode')
    .get(qrcode);

module.exports = router;