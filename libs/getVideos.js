import cheerio from 'cheerio';
const debug = require('debug')('NOWapis:libs:getVideo');

module.exports = function(html) {

    let results = [];
    let $ = cheerio.load(html, {
        decodeEntities: false
    });
    $('.youtube-player').each(function(idx, element) {
        let youtubeId; 
        let url = $(element).attr('src');
        debug('url = %s', url);
        let match = url.match(/youtube.com\/(v|embed)\/([^"?]+)/);
        // let match = url.match(/https:\/\/www.youtube.com\/embed\/(.+?)&/);
        debug('match = %s', match);
        if(match) {
            youtubeId = match[2];
            debug('youtubeId = %s', youtubeId);
            results.push({
                type: 'youtube',
                url: url,
                youtubeId: youtubeId,
                iframe: $(element).parent().html()
            });
        }
    });

    $('iframe').each((idx, element) => {
        let url = $(element).attr('src');
        let match = url.match(/https:\/\/www.facebook.com\/plugins\/video.php/);
        debug('match = %s', match);
        if(match) {
            results.push({
                type: 'facebook',
                url: url,
                youtubeId: null,
                iframe: null
            });
        }
    });

    return results;
};