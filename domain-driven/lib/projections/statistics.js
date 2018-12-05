'use strict';

const eventPublisher = require('../eventPublisher');

const statistics = [
  { key: 'openedGames', value: 0 }
];

eventPublisher.on('events::*', event => {
  switch (event.name) {
    case 'opened': {
      const openedGames =
        statistics.find(item => item.key === 'openedGames')

      openedGames.value += 1;
    }
    default: {
      break;
    }
  }
});

module.exports = statistics;
