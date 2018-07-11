const express = require('express');
const router = express.Router();
const session = require('express-session');
const bcrypt = require('bcryptjs');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'password',
    database : 'eatistay'
  }
});

const userRepo = require('./repo')(knex);
const userCtrl = require('./controller')(userRepo, bcrypt, session);

router.get('/getUsers', userCtrl.getUsers);
router.post('/newUser', userCtrl.newUser);
router.post('/Login', userCtrl.login);
router.post('/setRestoID', userCtrl.setRestoID);
router.post('/logout', userCtrl.logout);
router.get('/checkSession', userCtrl.checkSession);
router.get('/checkUser/:id', userCtrl.checkUser);

module.exports = router;