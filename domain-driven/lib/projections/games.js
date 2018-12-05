'use strict';

const eventPublisher = require('../eventPublisher');

const games = [];

eventPublisher.on('events::*', event => {
  switch (event.name) {
    case 'opened': {
      const game = {
        id: event.aggregateId,
        level: event.data.level,
        question: event.data.question,
        isCompleted: false
      };

      games.push(game);
    }
    default: {
      break;
    }
  }
});

module.exports = games;
