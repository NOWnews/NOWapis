import express from 'express';

const controllers = require('./controllers');

let app = express();

// controllers
app.use(controllers(app));

module.exports = app;