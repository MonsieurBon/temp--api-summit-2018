'use strict';

const uuid = require('uuidv4'),
      Value = require('validate-value');

const eventPublisher = require('../eventPublisher'),
      eventStore = require('../eventStore'),
      riddles = require('../shared/riddles.json');

const value = new Value({
  type: 'object',
  properties: {
    aggregateId: { type: 'string', format: 'uuid' },
    guess: { type: 'string', minLength: 1 }
  },
  required: [ 'aggregateId', 'guess' ],
  additionalProperties: false
});

const guess = (req, res) => {
  if (!value.isValid(req.body)) {
    return res.status(400).end();
  }

  res.status(200).end();

  const { aggregateId, guess } = req.body;

  const events = eventStore.getEventStream(aggregateId);

  const game = {
    id: aggregateId,
    level: undefined,
    isCompleted: false
  };

  for (const event of events) {
    switch (event.name) {
      case 'opened': {
        game.level = event.data.level;
        break;
      }
      case 'succeeded': {
        game.level = event.data.nextLevel;
        break;
      }
      case 'completed': {
        game.isCompleted = true;
        break;
      }
    }
  }

  if (game.isCompleted) {
    const guessFailed = {
      aggregateId,
      id: uuid(),
      name: 'guessFailed',
      data: {
        reason: 'Game has already been completed.'
      }
    };

    return eventPublisher.publish(guessFailed);
  }

  const answer = riddles[game.level - 1].answer;

  const isGuessCorrect =
    answer.toLowerCase() === guess.trim().toLowerCase();

  if (!isGuessCorrect) {
    const failed = {
      aggregateId,
      id: uuid(),
      name: 'failed',
      data: { level: game.level }
    };

    return eventPublisher.publish(failed);
  }

  const nextLevel = game.level + 1;
  const hasNextLevel = nextLevel <= riddles.length;

  if (!hasNextLevel) {
    const succeeded = {
      aggregateId,
      id: uuid(),
      name: 'succeeded',
      data: { level: game.level }
    };

    eventPublisher.publish(succeeded);

    const completed = {
      aggregateId,
      id: uuid(),
      name: 'completed',
      data: {}
    };

    return eventPublisher.publish(completed);
  }

  const nextQuestion = riddles[nextLevel - 1].question;

  const succeeded = {
    aggregateId,
    id: uuid(),
    name: 'succeeded',
    data: { level: game.level, nextLevel, nextQuestion }
  };

  eventPublisher.publish(succeeded);
};

module.exports = guess;
