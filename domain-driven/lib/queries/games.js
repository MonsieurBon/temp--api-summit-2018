'use strict';

const projections = require('../projections');

const games = (req, res) => {
  res.json(projections.games);
};

module.exports = games;
