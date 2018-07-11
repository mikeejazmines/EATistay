var express = require('express');
var router = express.Router();

var reviewRouter = require('./review/router.js');
var mealRouter = require('./meal/router.js');
var reservationRouter = require('./reservation/router.js');
var userRouter = require('./user/router.js');
var restaurantRouter = require('./restaurant/router.js');

router.use(mealRouter);
router.use(reservationRouter);
router.use(userRouter);
router.use(restaurantRouter);
router.use(reviewRouter);

module.exports = router;