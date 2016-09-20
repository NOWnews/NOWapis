# Change Log

NOWapis 所有的變更紀錄都在這份文件中

## [1.0.1] - 2016-09-20
### Fixed
- 修正人氣新聞出現未來新聞的 bug @SimonSun.

### Changed
- 拿掉 `cronjobs/updateHotNews.js` 中冗餘的程式碼 @SimonSun.
- `cronjobs/updateHotNews.js` 中的 `createdAt` 欄位，改用 `field_release_date.value` 而不是 `created` @SimonSun.
- `package.json` 增加一個版號 @SimonSun.