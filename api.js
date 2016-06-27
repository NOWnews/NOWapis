import express from 'express';

const controllers = require('./controllers');
const middlewares = require('./middlewares');

let app = express();

// middlewares
app.use(middlewares(app));

// controllers
app.use(controllers(app));

module.exports = app;