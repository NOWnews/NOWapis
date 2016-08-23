import express from 'express';
let router = express.Router();

/*
 * 新聞
 */
const newsCategoryList = require('./newsCategoryList'); // 新聞全部分類
const newsList = require('./newsList'); // 新聞分類新聞列表

/*
 * 圖集
 */

/*
 * 影音
 */

router.route('/category/news')
    .get(newsCategoryList);

router.route('/category/news/:taxId')
    .get(newsList);

module.exports = router;