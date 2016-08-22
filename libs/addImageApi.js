import cheerio from 'cheerio';
const debug = require('debug')('NOWapis:libs:addImageApi');

module.exports = function(html) {

    let $ = cheerio.load(html, {
        decodeEntities: false
    });

    $('img').filter(function(i, el) {
        let originSrc = $(el).attr('src');
        $(el).attr('src', `http://imgapi.nownews.com/?w=640&q=75&src=${originSrc}`);
    });

    let result = $.html();
    return result;
};