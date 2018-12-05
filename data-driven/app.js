'use strict';

const http = require('http');

const flaschenpost = require('flaschenpost'),
      processenv = require('processenv');

const api = require('./lib/api');

const logger = flaschenpost.getLogger();

const server = http.createServer(api);

const port = processenv('PORT', 3000);

server.listen(port, () => {
  logger.info('Server started.', { port });
});
