import cheerio from 'cheerio';
const debug = require('debug')('NOWapis:libs:addImageApi');

module.exports = function(html) {

    let $ = cheerio.load(html, {
        decodeEntities: false
    });

    $('img').filter(function(i, el) {
        let originSrc = $(el).attr('src');
        let regexpString = /http:\/\/[A-Za-z].nownews.com\/sites\/default\/files/;
        let matchString = originSrc.match(regexpString);

        if(matchString !== null) {
            originSrc = originSrc.replace(/http:\/\/[A-Za-z].nownews.com\/sites\/default\/files/g, 'https://s.nownews.com');
            originSrc = `https://imgapi.nownews.com/?w=640&q=75&src=${originSrc}`;
        }
        // 如果是從 e.nownews 出來的，就換成 s.nownews
        // console.log(originSrc);
        $(el).attr('src', originSrc);
    });

    let result = $.html();
    return result;
};