# Change Log

NOWapis 所有的變更紀錄都在這份文件中

## [1.0.20] - 2017-04-14
### Added
- 加入國民黨 2017 黨主席辯論直播 API @SimonSun.
- 加入訂單結帳 QR code API @SimonSun.

## [1.0.19] - 2017-04-13
### Added
- 加入非常視界的直播頻道 API @SimonSun.

## [1.0.18] - 2017-03-10
### Added
- 將健康頻道隱藏起來 @WayneLin.

## [1.0.17] - 2017-03-08
### Added
- 加入 app 首圖 api 端點在 `controllers/headImage` @SimonSun.
- 加入記錄 mobile device token API 端點在 `controllers/deviceToken` @SimonSun.

## [1.0.16] - 2017-01-11
### Changed
- 將所有的內部連結從 `http` 改為 `https` @SimonSun.

### Added
- 開一隻專門給 https 用的 sitemap @SimonSun.
- 開一隻給 mobile web 提交的 news sitemap @SimonSun.

## [1.0.14] - 2016-12-01
### Added
- 在 `config.js` 加入 header key `JHK` @SimonSun.

## [1.0.13] - 2016-11-23
### Fixed
- 修正廣告吐出錯誤問題，但是不包含廣告上錯的人為因素 @SimonSun.

## [1.0.12] - 2016-11-09
### Fixed
- 修正廣告吐出有可能是 buffer 的問題 @SimonSun.

## [1.0.11] - 2016-11-08
### Changed
- 新聞圖片的 title 與 desc 是分開的，將圖說改為正確的 desc @SimonSun.

## [1.0.10] - 2016-11-07
### Changed
- 更改 `config.js` 中， mongodb 連線的資料，從 `61.220.58.2` 改成 `mongodb-s14.nownews.com.tw` @SimonSun.

## [1.0.9] - 2016-10-28
### Changed
- 讀取最新10則新聞，使用 release date 來做判斷 @SimonSun.

## [1.0.8] - 2016-10-21
### Changed
- 修正讀取廣告沒東西的錯誤 @SimonSun.

## [1.0.7] - 2016-10-17
### Added
- 加入 `is_js` module @SimonSun.

### Changed
- 修改文件 @SimonSun.

### Fixed
- 修正如果廣告沒有吐出任何東西會發生錯誤 @SimonSun

## [1.0.6] - 2016-10-06
### Added
- 新增附近的人在看什麼新聞的功能 @SimonSun.

## [1.0.5] - 2016-10-02
### Changed
- 新聞內頁的時間改用發佈時間 `field_release_date.value` @SimonSun.

## [1.0.4] - 2016-09-29
### Changed
- 更新 API 文件 @SimonSun.

## [1.0.3] - 2016-09-29
### Changed
- 更改 header key 的撈取方式 @SimonSun.
- 加入昕淇專屬的 header key @SimonSun.

## [1.0.2] - 2016-09-21
### Fixed
- 去要 ad2004 的廣告會 timeout @SimonSun.

## [1.0.1] - 2016-09-20
### Fixed
- 修正人氣新聞出現未來新聞的 bug @SimonSun.

### Changed
- 拿掉 `cronjobs/updateHotNews.js` 中冗餘的程式碼 @SimonSun.
- `cronjobs/updateHotNews.js` 中的 `createdAt` 欄位，改用 `field_release_date.value` 而不是 `created` @SimonSun.
- `package.json` 增加一個版號 @SimonSun.
