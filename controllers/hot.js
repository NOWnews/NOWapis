import express from 'express';
let router = express.Router();

import co from 'co';

const models = require('../models');
const redis = require('../redis');

router.route('/hot')
    .get(function(req, res, next) {
        var hot = {};
        req._imgw = req.query.w ? req.query.w : null;
        req._imgH = req.query.h ? req.query.h : null;

        util.flow.exec(
            function() {
                if (!req.query.k) {
                    this(0);
                } else {
                    var that = this;
                    util.misc.getTaxonomyByName(req.query.k, function(tax) {
                        that(tax.id);
                    });
                }
            },
            function(tid) {
                util.news.getHotNewsByTid(tid, hot, this, null, null, req.query.rurl, req._imgw, req._imgH);
            },
            function() {
                var out = [];
                for (var idx in hot.ids) {
                    var id = hot.ids[idx];

                    // eric 2015-07-19
                    unifyImgFieldAuth(hot.items[id].imgs);
                    out.push(hot.items[id]);
                }
                res.send(out);
            }
        );


        return res.json({});
    });

module.exports = router;
