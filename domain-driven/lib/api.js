'use strict';

const bodyParser = require('body-parser'),
      cors = require('cors'),
      express = require('express');

const commands = require('./commands'),
      queries = require('./queries');

const api = express();

api.use(cors());
api.use(bodyParser.json());

// Commands
api.post('/open', commands.open);

// Queries
api.get('/games', queries.games);
api.get('/statistics', queries.statistics);

module.exports = api;
