'use strict';
const Express = require('express'),
      router = Express.Router(),
      BodyParser = require('body-parser'),
      parseUrlEncoded = BodyParser.urlencoded({ extended: false }),
      SearchController = require('../controllers/SearchController');


router
  .route('/')
  .get(SearchController.getStarredEvents);

module.exports = router;
