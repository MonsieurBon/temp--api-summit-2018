'use strict';

const eventPublisher = require('../eventPublisher');

const events = (req, res) => {
  res.writeHead(200, {
    'content-type': 'application/jsonl'
  });

  eventPublisher.on('events::*', event => {
    res.write(JSON.stringify(event));
    res.write('\n');
  });
};

module.exports = events;
