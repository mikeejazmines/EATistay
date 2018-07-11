const express = require('express');
const router = express.Router();

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'password',
    database : 'eatistay'
  }
});

const repo = require('./repo')(knex);
const reviewCtrl = require('./controller')(repo);

router.post('/makeReview', reviewCtrl.makeReview);
router.get('/getAllReviews', reviewCtrl.getAllReviews);
router.get('/getReviews/:resto_id', reviewCtrl.getReviews);

module.exports = router;