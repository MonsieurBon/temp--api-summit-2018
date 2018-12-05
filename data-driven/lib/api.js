'use strict';

const bodyParser = require('body-parser'),
      cors = require('cors'),
      express = require('express');

const routes = require('./routes');

const api = express();

api.use(cors());
api.use(bodyParser.json());

api.post('/articles', routes.postArticles);
api.get('/articles', routes.getArticles);

module.exports = api;
