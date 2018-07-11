var express = require('express');
var app = express();
var router = require('./router.js')
var session = require('express-session');
var bodyparser = require('body-parser');
var bcrypt = require('bcryptjs');
var cors = require('cors');

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'password',
    database : 'eatistay'
  }
});

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors({origin: [
  "http://localhost:4200"
], credentials: true}));

app.use(session({
  secret: "Shh, its a secret!",
  resave: false,
  saveUninitialized: true,
  maxAge: 1000 * 60 * 60	
}));

app.use('/', router);

app.listen(3000)