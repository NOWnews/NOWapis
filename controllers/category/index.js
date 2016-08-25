import express from 'express';
let router = express.Router();

/*
 * 新聞
 */
const newsCategoryList = require('./newsCategoryList'); // 新聞全部分類
const newsList = require('./newsList'); // 新聞分類新聞列表

router.route('/category/news')
    .get(newsCategoryList);

router.route('/category/news/:taxId')
    .get(newsList);

/*
 * 圖集
 */
const photosCategoriesList = require('./photosCategoriesList'); // 圖集全部分類
const photosList = require('./photosList'); // 新聞分類新聞列表

router.route('/category/photos')
    .get(photosCategoriesList);

router.route('/category/photos/:taxId')
    .get(photosList);

/*
 * 影音
 */
const videosCategoriesList = require('./videosCategoriesList'); // 圖集全部分類
const videosList = require('./videosList'); // 新聞分類新聞列表

router.route('/category/videos')
    .get(videosCategoriesList);

router.route('/category/videos/:taxId')
    .get(videosList);


module.exports = router;