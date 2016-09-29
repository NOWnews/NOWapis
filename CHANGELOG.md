# Change Log

NOWapis 所有的變更紀錄都在這份文件中

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