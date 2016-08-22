import cheerio from 'cheerio';
const debug = require('debug')('NOWapis:libs:addImageApi');

module.exports = function(html) {

    let $ = cheerio.load(html, {
        decodeEntities: false
    });

    $('img').filter(function(i, el) {
        let originSrc = $(el).attr('src');
        let regexpString = /http:\/\/e.nownews.com\/sites\/default\/files/;
        let matchString = originSrc.match(regexpString);
        if(matchString !== null) {
            originSrc = originSrc.replace(/http:\/\/e.nownews.com\/sites\/default\/files/g, 'http://s.nownews.com');
        }
        // 如果是從 e.nownews 出來的，就換成 s.nownews
        $(el).attr('src', `http://imgapi.nownews.com/?w=640&q=75&src=${originSrc}`);
    });

    let result = $.html();
    return result;
};