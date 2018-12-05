'use strict';

const articles = require('../data/articles');

const getArticles = (req, res) => {
  res.json(articles);
};

module.exports = getArticles;
