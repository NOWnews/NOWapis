import express from 'express';

const controllers = require('./controllers');
const middlewares = require('./middlewares');
const errorHandles = require('./errorHandles');

let app = express();

// middlewares
app.use(middlewares(app));

// controllers
app.use(controllers(app));

// errorHandles
app.use(errorHandles(app));

module.exports = app;