require('dotenv').config();
require('./models/db');
const bodyParser = require('body-parser');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const authenticationMiddleware = require('./middleware/authentication');

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Population management');
});

app.use(authenticationMiddleware);
app.use('/api/v1', routes);
app.use(errorHandler);

module.exports = app;
