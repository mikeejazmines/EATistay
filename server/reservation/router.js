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

const reservationRepo = require('./repo')(knex);
const reservationCtrl = require('./controller')(reservationRepo);

router.post('/newReservation', reservationCtrl.newReservation);
router.put('/editReservationTime', reservationCtrl.editReservationTime);
router.get('/getAllReservations', reservationCtrl.getAllReservations);
router.get('/getReservations/:resto_id', reservationCtrl.getReservations); //params
router.get('/getCustomerReservations/:cust_id', reservationCtrl.getCustomerReservations); //params
router.delete('/deleteReservation/:id', reservationCtrl.deleteReservation); //params
router.get('/getReservationsDay/:resto_id/:resdate', reservationCtrl.getReservationsDay); //params
router.get('/getReservation/:reservation_id', reservationCtrl.getReservation); //params

module.exports = router;