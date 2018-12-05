'use strict';

const articles = require('../data/articles');

const postArticles = (req, res) => {
  const article = req.body;

  articles.push(article);

  res.status(200).end();
};

module.exports = postArticles;
