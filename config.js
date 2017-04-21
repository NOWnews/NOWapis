
module.exports = {

    /*
     * 目前 NOWnews 主站的主要 database
     */
    // newsMongoDb: process.env.NODE_ENV === 'production' ? 'mongodb://nowproduction:werocks@192.168.10.181,192.168.10.182,192.168.10.183,192.168.10.184/production' : 'mongodb://nowproduction:werocks@mongodb16.nownews.com.tw,mongodb15.nownews.com.tw,mongodb14.nownews.com.tw,mongodb18.nownews.com.tw/production',
    // newsMongoDb: process.env.NODE_ENV === 'production' ? 'mongodb://nowproduction:werocks@192.168.10.182/production' : 'mongodb://nowproduction:werocks@192.168.10.182/production',
    newsMongoDb: process.env.NODE_ENV === 'production' ? 'mongodb://nowproduction:werocks@TXGmongo-s185.nownews.com.tw,mongodb-s15.nownews.com.tw,mongodb-s16.nownews.com.tw,mongodb-s17.nownews.com.tw,mongodb-s18.nownews.com.tw,mongodb-s14.nownews.com.tw/production?readPreference=nearest&replicaSet=nowgarden&connectTimeoutMS=5000&socketTimeoutMS=5000' : 'mongodb://nowproduction:werocks@mongodb-s14.nownews.com.tw/production?connectTimeoutMS=5000&socketTimeoutMS=5000',

    /*
     * mongoDB 資料
     */
    mongodb: {
        host: process.env.NODE_ENV === 'production' ? 'mongodb://localhost:27017' : 'mongodb://localhost:27017',
        dbName: process.env.NODE_ENV === 'production' ? 'v3api_production' : 'v3api_staging'
    },

    /*
     * redis 資料
     */
     redis: {
        host: process.env.NODE_ENV === 'production' ? 'localhost' : 'localhost',
        expireSeconds: 3600
     },

     /*
      * 圖集分類 tid 總覽(先寫死，因為查詢的邏輯太複雜)
      */
    photosTids: [
        { tid: 2691, name: '圖集總覽' },
        { tid: 2551, name: '影劇' },
        { tid: 3472, name: '正妹' },
        { tid: 3471, name: '要聞' },
        { tid: 2562, name: '新奇' },
        { tid: 2730, name: '寵物' },
        { tid: 2607, name: '運動' },
        { tid: 2806, name: '旅遊' },
        { tid: 8039, name: '名人' },
        { tid: 2559, name: '其他' },
    ],

    /*
     * 影音分類 tid 總覽(先寫死，因為查詢的邏輯太複雜)
     */
    videosTids: [
        { tid: 8297, name: '最新' },
        { tid: 2698, name: '新聞' },
        { tid: 3981, name: '美食' },
        { tid: 2927, name: '娛樂' },
        { tid: 2806, name: '旅遊' },
        { tid: 2607, name: '運動' },
        { tid: 3757, name: '時尚' },
        { tid: 3996, name: '文化' },
        { tid: 14133, name: '知識' },
        { tid: 2730, name: '寵物' },
    ],

    /*
     * Youtube api 端點資訊
     */
    youtube: {
        thumbnail: 'http://img.youtube.com/vi',
        embed: 'https://www.youtube.com/embed'
    },

    /*
     * solr 相關設定檔
     */
    solr: {
        host: 'solr10.nownews.com.tw',
        port: '8080',
        core: 'core0',
        path: 'solr'
    },

    /*
     * header routers 的白名單資訊
     */
    headerWhiteList: [
        '/check'
    ],

    /*
     * HTTP HEADER 欄位 key
     */
    header: {
        'X-NOWnews-API': ['NOWnewsTaiwanNumberOne', 'csmuse_dev', 'JHK', 'VSOONTECH']
    },

    pageview: {
        host: process.env.NODE_ENV === 'production' ? 'pv.nownews.pri' : '61.67.121.50',
        port: process.env.NODE_ENV === 'production' ? 10012 : 10012
    }
};