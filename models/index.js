import Promise from 'bluebird';
import mongoose from 'mongoose';

const config = require('../config');

/*
 * 利用 bluebird 將 mongoose 轉換成可以使用 promise
 */
Promise.promisifyAll(mongoose);

mongoose.connectAsync(`${config.mongodb.host}/${config.mongodb.dbName}`);
const connection = mongoose.connection;
console.log(`mongodb connect to: ${config.mongodb.host}/${config.mongodb.dbName}`);

module.exports = {

};