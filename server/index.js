var express = require('express');
var app = express();
var router = require('./router.js')
var session = require('express-session');
var bodyparser = require('body-parser');
var bcrypt = require('bcryptjs');
var cors = require('cors');
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {

    // Log whenever a user connects
    console.log('user connected');

    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('message', (message) => {
        console.log("Message Received: " + message);
        io.emit('message', {type:'new-message', text: message});    
    });

    socket.on('userResponse', (response) => {
      console.log("Response Received:")
      console.log(response);
      io.emit('userResponse', {type:'new-response', response: response});    
  });


});

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

http.listen(3000, () => {
  console.log('started on port 3000');
});

// app.listen(3000)