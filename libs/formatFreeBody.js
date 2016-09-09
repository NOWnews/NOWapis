import cheerio from 'cheerio';
const debug = require('debug')('NOWapis:libs:formatFreeBody');

module.exports = function(html) {

    let $ = cheerio.load(html, {
        decodeEntities: false
    });

    $('.other_info1').each((idx, element) => {
        $(element).remove();
    });

    return $.html();
};