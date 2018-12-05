'use strict';

const uuid = require('uuidv4'),
      Value = require('validate-value');

const eventPublisher = require('../eventPublisher'),
      riddles = require('../shared/riddles.json');

const value = new Value({
  type: 'object',
  properties: {
    aggregateId: { type: 'string', format: 'uuid' }
  },
  required: [ 'aggregateId' ],
  additionalProperties: false
});

const open = (req, res) => {
  if (!value.isValid(req.body)) {
    return res.status(400).end();
  }

  res.status(200).end();

  const { aggregateId } = req.body;

  const level = 1,
        question = riddles[level - 1].question;

  const opened = {
    aggregateId,
    id: uuid(),
    name: 'opened',
    data: { level, question }
  };

  eventPublisher.publish(opened);
};

module.exports = open;
