
import cheerio from 'cheerio';

module.exports = function(html) {

    let results = [];
    let $ = cheerio.load(html, {
        decodeEntities: false
    });
    $('p').each(function(idx, element) {
        let obj = {};

        if ($(element).find('img').length) {
            obj.tag = 'image';
            obj.src = $(element).find('img').attr('src');
            obj.content = $(element).find('em').text() || $(element).find('cite').text();
        } else {
            obj.tag = 'p';
            obj.content = $(element).text();
        }

        results.push(obj);
    });

    return results;
};