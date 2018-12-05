'use strict';

const http = require('http');

const flaschenpost = require('flaschenpost'),
      processenv = require('processenv');

const api = require('./lib/api'),
      eventPublisher = require('./lib/eventPublisher'),
      eventStore = require('./lib/eventStore');

const logger = flaschenpost.getLogger(),
      port = processenv('PORT', 3000);

const server = http.createServer(api);

eventPublisher.on('events::*', event => {
  eventStore.save(event);
});

server.listen(port, () => {
  logger.info('Server started.', { port });
});
