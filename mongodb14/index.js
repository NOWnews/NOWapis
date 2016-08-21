import Promise from 'bluebird';
import mongodb from 'mongodb';

import config from '../config';

const MongoDB = Promise.promisifyAll(mongodb);
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

let db = MongoClient.connectAsync(config.newsMongoDb);

module.exports = db;