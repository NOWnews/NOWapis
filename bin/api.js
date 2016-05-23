require('babel-core/register');
require('babel-polyfill');

let api = require('../api.js');
let http = require('http');

let env = process.env.NODE_ENV;
let port = process.env.PORT || '5000';
api.set('port', port);

var server = http.createServer(api);
server.listen(port);
console.log(`-------------------------------`);
console.log(`Start NOWapis`);
console.log(`Listen Port ${port}`);
console.log(`${env} mode`);
console.log(`-------------------------------`);