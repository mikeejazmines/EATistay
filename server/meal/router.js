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

const mealRepo = require('./repo')(knex);
const mealCtrl = require('./controller')(mealRepo);


router.post('/addMeal', mealCtrl.addMeal);
router.put('/editMeal', mealCtrl.editMeal);
router.delete('/deleteMeal/:id', mealCtrl.deleteMeal); //param
router.get('/getAllMeals', mealCtrl.getAllMeals);
// router.get('/getMeals', mealCtrl.getMeals);
// router.get('/getMeals/:resto_id', mealCtrl.getMeals); //param
router.get('/getMeal/:meal_id', mealCtrl.getMeal);

module.exports = router;