
module.exports = {

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

};