/*
 * 產生結帳 qrcode
 */

import co from 'co';
const debug = require('debug')('NOWapis:controller:order:qrcode');

import qr from 'qrcode';
import Promise from 'bluebird';

const redis = require('../../redis');

module.exports = function(req, res, next) {

    co(function*() {

        let { order_no, order_amount, order_desc, member_id, buyer_mobile, buyer_mail  } = req.body;

        let qrcode = yield new Promise(function(resolve, reject) {

            let orderUrl = `/order?order_no=${order_no}&order_amount=${order_amount}&order_desc=${order_desc}&member_id=${member_id}&buyer_mobile=${buyer_mobile}&buyer_mail=${buyer_mail}`;

            qr.toDataURL(orderUrl, { errorCorrectionLevel: 'H' }, function(err, data) {
                if(err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });

        return res.json({
            order_no: order_no || null,
            order_amount: order_amount || null,
            order_desc: order_desc || null,
            member_id: member_id || null,
            buyer_mobile: buyer_mobile || null,
            buyer_mail: buyer_mail || null,
            imageBase64String: qrcode
        });
    })
    .catch(next);
};