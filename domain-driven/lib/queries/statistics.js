'use strict';

const projections = require('../projections');

const statistics = (req, res) => {
  res.json(projections.statistics);
};

module.exports = statistics;
