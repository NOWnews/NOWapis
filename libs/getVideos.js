import cheerio from 'cheerio';

module.exports = function(html) {

    let results = [];
    let $ = cheerio.load(html);
    $('.youtube-player').each(function(idx, element) {
        let youtubeId; 
        let url = $(element).attr('src');
        let match = url.match(/https:\/\/www.youtube.com\/embed\/(.+?)&/);
        if(match) {
            youtubeId = match[1];
            results.push({
                type: 'youtube',
                youtubeId: youtubeId,
                iframe: $(element).parent().html()
            });
        }
    });

    return results;
};