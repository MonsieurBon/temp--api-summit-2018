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
      break;
    }
    case 'succeeded': {
      const game =
        games.find(game => game.id === event.aggregateId);

      game.level = event.data.nextLevel;
      game.question = event.data.nextQuestion;
      break;
    }
    case 'completed': {
      const game =
        games.find(game => game.id === event.aggregateId);

      game.level = undefined;
      game.question = undefined;
      game.isCompleted = true;
      break;
    }
    default: {
      break;
    }
  }
});

module.exports = games;
