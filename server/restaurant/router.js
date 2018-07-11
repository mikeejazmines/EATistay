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

const restoRepo = require('./repo')(knex);
const restoCtrl = require('./controller')(restoRepo);

router.get('/getRestaurants', restoCtrl.getRestaurants);
router.get('/getRestaurant', restoCtrl.getRestaurant);
router.get('/getRestaurant/:id', restoCtrl.getRestaurant);
router.get('/getMeals', restoCtrl.getMeals); //two of these
router.get('/getMeals/:resto_id', restoCtrl.getMeals); 
router.post('/newRestaurant', restoCtrl.newRestaurant);
router.put('/editDescription', restoCtrl.editDescription);
router.put('/editLimit', restoCtrl.editLimit);
router.post('/confirm', restoCtrl.confirm);

module.exports = router;