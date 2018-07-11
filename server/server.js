var express = require('express');
var app = express();
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

/**
 * ORDER OF FUNCTIONS:
 * - Users
 * - Restaurants
 * - Meals
 * - Reservations
 * - Reviews
 */

 /**
  * USER FUNCTIONS
  * - getUsers
  * - newUser
  * - checkPassword
  * - Login
  */
app.get('/getUsers', function(req, res) {
  knex.raw('select * from users').then(function(value){
      res.send(value[0]);
  }).catch(console.log)
})

app.post('/newUser', function(req, res) {
  if(!req.body.email){
    res.status(400).send({error: 'missing email'});
  }
  else if (!req.body.password){
    res.status(400).send({error: 'missing password'});
  }
  else if(!req.body.name){
    res.status(400).send({error: 'missing password'});
  }

  var type;
  if(req.body.type == 'customer'){
    type = 'c';
  }else if(req.body.type == 'owner'){
    type = 'o';
  }
  params= [req.body.email, req.body.name, null, type];

  let checkUserPromise = new Promise(function(resolve, reject){
    knex.raw(`select email from users`).then(function(value){
      var emails = value[0];
      for(var i = 0; i < emails.length; i++){
        if(emails[i].email == req.body.email) resolve(true);
      }
      resolve(false);
    }).catch(console.log)
  })
  .then(function(check){
    if(!check){
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          params[2] = hash;
          knex.raw(`INSERT INTO users(email, username, password, user_type) VALUES (?, ?, ?, ?)`, params).then(function(value){
            req.session.user = ({userID: value[0].insertId, username: req.body.name, usertype: type});
            //change to req.send user
            res.send({username: req.body.name, usertype: type, userID: value[0].insertId});
          }).catch(function(error){
        res.status(500).send(error);
      })
        });
      })
    }
    else res.status(500).send({error: "Email in use"});
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.post('/Login', function(req, res) {
  knex.raw(`select * from users where email = \'${req.body.email}\'`).then(function(value){
    if(value[0][0] == null){
      console.log("test");
      res.status(400).send({error: 'Wrong login details'});
    }
    else{
      bcrypt.compare(req.body.password, value[0][0].password).then((result) => {
        if(result){
          req.session.user = ({userID: value[0][0].userid, username: value[0][0].username, usertype: value[0][0].user_type});
          console.log("SESSION");
          console.log(req.session);
          res.status(200).send(req.session.user);
        } else {
          res.status(400).send({error: 'Wrong login details'});
        }
        return result;
      }).catch(function(error){
        res.status(500).send(error);
      })
    }
  }).catch(function(error){
    res.status(500).send(error);
  })
})

app.post('/setRestoID', function(req, res) {
  if(!req.session.user.userID){
    res.status(400).send({error: "No user ID"});
  }
  else {
    knex.raw(`select * from restaurants where owner_id = \'${req.session.user.userID}\'`).then(function(value){
      console.log(value[0][0]);
      if(!value[0][0]){
        res.status(400).send({error: 'No such restaurant.'});
      }
      else {
        req.session.restoid = value[0][0].restaurant_id;
        req.session.restoname = value[0][0].restaurant_name;
        console.log(req.session);
        res.status(200).send(value[0][0]);
      }
    }).catch(function(error){
          res.status(500).send(error);
        })
  }
})

app.post('/logout', function(req, res) {
  console.log('out');
  if(!req.session.user.userID){
    res.status(400).send({error: "You are not logged in"});
  }
  else{
    req.session.destroy();
    res.status(200).send({message: "Logged out"});
  }
})

app.get('/checkLogin', function(req, res) {
  res.status(200).send({user: req.session.user});
})

app.get('/checkSession', function(req, res) {
  res.status(200).send({user: req.session});
})

app.get('/checkUser/:id', function(req, res) {
  knex.raw('select * from users where userid = \'${req.params.id}\'').then(function(value){
    res.status(200).send(value[0]);
  }).catch(console.log)
})


/**
  * RESTAURANT FUNCTIONS
  * - getRestaurants
  * - newRestaurant
  * - editDescription
  * - editLimit
  * - confirm
  */

app.get('/getRestaurants', function(req, res) {
  var queryString = "select * from restaurants";
  var keys = Object.keys(req.query);
  var values = Object.values(req.query);

  if(values.length >= 2 && keys[1] == "filter"){
    queryString+= ` WHERE ${values[0]} = \'${values[1]}\'`
    if(values.length > 2 && keys[2] == "sort"){
      queryString+= ` ORDER BY ${values[2]}`
    }
  }
  else if(keys[0] == "sort"){
    queryString+= ` ORDER BY ${values[0]}`
  }
  
  queryString += ";";
  
  knex.raw(queryString).then(function(value){
      res.send(value[0]);
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.get('/getRestaurant', function(req, res) {
  if(!req.session.restoid){
    res.status(400).send({error: 'missing restaurant id'});
  }
  knex.raw(`select * from restaurants where restaurant_id = \'${req.session.restoid}\'`).then(function(value){
    if(!value[0][0]){
      res.status(400).send({error: 'No such restaurant.'});
    }
    else res.status(200).send(value[0][0]);
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.get('/getRestaurant/:id', function(req, res) {
  if(!req.params.id){
    res.status(400).send('missing restaurant id');
  }
  knex.raw(`select * from restaurants where restaurant_id = \'${req.params.id}\'`).then(function(value){
    if(!value[0][0]){
      res.status(400).send('No such restaurant.');
    }
    else res.status(200).send(value[0][0]);
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.get('/getMeals', function(req, res) {
  if(!req.session.restoid){
    res.status(400).send({error: 'missing restaurant id'});
  }
  knex.raw(`select * from restaurants where restaurant_id = \'${req.session.restoid}\'`).then(function(value){
    if(!value[0][0]){
      res.status(400).send({error: 'No such restaurant.'});
    }
    else {
      knex.raw(`select * from meals where resto_id = \'${req.session.restoid}\'`).then(function(value){
        if(!value[0][0]){
          res.status(400).send({error: 'Restaurant is not selling meals now.'});
        }
        else res.send(value[0]);
      }).catch(function(error){
        res.status(500).send(error);
      })
    }
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.get('/getMeals/:resto_id', function(req, res) {
  if(!req.params.resto_id){
    res.status(400).send({error: 'missing restaurant id'});
  }
  knex.raw(`select * from restaurants where restaurant_id = \'${req.params.resto_id}\'`).then(function(value){
    if(!value[0][0]){
      res.status(400).send({error: 'No such restaurant.'});
    }
    else {
      knex.raw(`select * from meals where resto_id = \'${req.params.resto_id}\'`).then(function(value){
        if(!value[0][0]){
          res.status(400).send({error: 'Restaurant is not selling meals now.'});
        }
        else res.send(value[0]);
      }).catch(function(error){
        res.status(500).send(error);
      })
    }
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.post('/newRestaurant', function(req, res) {
  params= [req.body.name, req.body.description, req.body.location, req.session.user.userID, req.body.opening, req.body.closing, req.body.limit]

  if(!req.body.name){
    res.status(400).send({error: 'missing name'});
  }
  else if(!req.body.description){
    res.status(400).send({error: 'missing description'});
  } 
  else if(!req.body.location){
    res.status(400).send({error: 'missing location'});
  }
  else if(!req.session.user.userID){
    res.status(400).send({error: 'missing owner id'});
  }
  knex.raw(`SELECT * FROM users WHERE userid = ${req.session.user.userID} AND user_type = \'o\'`).then(function(value){
    if(!value[0][0]) res.send({error: "Cannot make restaurant. Please register as an owner first"});
    else {
      knex.raw(`INSERT INTO restaurants(restaurant_name, restaurant_description, restaurant_location, owner_id, opening, closing, max_daily) VALUES (?, ?, ?, ?, ?, ?, ?)`, params).then(function(value){
        req.session.restoid = value[0].insertId;
        req.session.restoname = req.body.name;
        res.send({resto_id: value[0].insertID, name: req.body.name});
      }).catch(function(error){
        res.status(500).send(error);
      })
    }
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.put('/editDescription', function(req, res) {
  if(!req.body.description){
    res.status(400).send({error: 'missing description'});
  }
  if(!req.session.restoid){
    res.status(400).send({error: 'You have no restaurant. Login as an owner to add a restaurant'});
  }
  knex.raw(`UPDATE restaurants SET restaurant_description = \'${req.body.description}\' WHERE restaurant_id = \'${req.session.restoid}\'`).then(function(value){
    if(value[0].affectedRows) res.status(200).send({message: "Updated description!"})
    else res.send({error: "Restaurant does not exist!"})
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.put('/editLimit', function(req, res) {
  if(!req.body.limit){
    res.status(400).send({error: 'No value for limit'});
  }
  if(!req.session.restoid){
    res.status(400).send({error: 'You have no restaurant. Login as an owner to add a restaurant'});
  }
  knex.raw(`UPDATE restaurants SET max_daily = \'${req.body.limit}\' WHERE restaurant_id = \'${req.session.restoid}\'`).then(function(value){
    if(value[0].affectedRows) res.status(200).send({message: "Updated reservation limit!"});
    else res.send({error: "Restaurant does not exist!"})
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.post('/confirm', function(req, res) {
  if(!req.body.id){
    res.status(400).send({error: 'Reservation not found'});
  }
  knex.raw(`UPDATE reservations SET confirmation = \'1\' WHERE reservation_id = \'${req.body.id}\'`).then(function(value){
    if(value[0].affectedRows) res.send({message: "Reservation is confirmed for: " +  req.body.id + "!"});
    else res.send({error: "Reservation does not exist!"});
  }).catch(console.log)
})

/**
 * MEAL FUNCTIONS
 * - addMeal
 * - editMeal
 * - deleteMeal/meal_id
 * - getAllMeals
 * - getMeal/restoid
 */

app.post('/addMeal', function(req, res) {

  console.log("ADD MEAL");
  console.log(req.session);
  console.log("desc: " + req.body.meal_description);
  console.log("name: " + req.body.meal_name);
  console.log("price: " + req.body.meal_price);
  if(!req.body.meal_name){
    res.status(400).send({error: 'missing name'});
  }
  else if(!req.body.meal_description){
    res.status(400).send({error: 'missing description'});
  } 
  else if(!req.body.meal_price){
    res.status(400).send({error: 'missing price'});
  }
  if(!req.session.restoid){
    res.status(400).send({error: 'You have no restaurant. Login as an owner to add a restaurant'});
  }

  params= [req.body.meal_name, req.body.meal_price, req.body.meal_description, req.session.restoid]
  knex.raw(`select * from restaurants where restaurant_id = \'${req.session.restoid}\'`).then(function(value){
    if(!value[0][0]){
      res.status(400).send({error: 'No such restaurant.'});
    }
    else {
      knex.raw(`INSERT INTO meals(meal_name, meal_price, meal_description, resto_id) VALUES (?, ?, ?, ?)`, params).then(function(value){
        res.status(200).send({meal_id: value[0].insertId});
      }).catch(function(error){
        console.log('hi');
        // res.status(500).send(error);
      })
    }
  }).catch(function(error){
    console.log('hi');
        // res.status(500).send(error);
      })
  
})

app.put('/editMeal', function(req, res) {
  params = [req.body.price, req.body.description, req.body.name, req.body.meal_id]
  if(!req.body.price){
    res.status(400).send({error: 'missing price'});
  }
  else if(!req.body.description){
    res.status(400).send({error: 'missing description'});
  }
  else if(!req.body.name){
    res.status(400).send({error: 'missing name'});
  }
  else if(!req.body.meal_id){
    res.status(400).send({error: 'missing meal id'});
  } 

  knex.raw(`UPDATE meals SET meal_price = ?, meal_description = ?, meal_name = ? WHERE meal_id = ?`, params).then(function(value){
    if(value[0].affectedRows) res.status(200).send({message: "Update Success!"});
    else res.send({error: "Meal does not exist!"})
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.delete('/deleteMeal/:id', function(req, res) {
  if(!req.params.id){
    res.status(400).send({error: 'missing meal id'});
  }
  knex.raw(`DELETE FROM meals WHERE meal_id = \'${req.params.id}\'`).then(function(value){
    if(value[0].affectedRows) res.status(200).send({message: "Deleted Meal Success!"});
    else res.send({error: "Meal does not exist."});
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.get('/getAllMeals', function(req, res) {
  knex.raw(`select * from meals`).then(function(value){
      res.send(value[0])
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.get('/getMeals', function(req, res) {
  if(!req.params.resto_id){
    res.status(400).send({error: 'missing restaurant id'});
  }
  knex.raw(`select * from restaurants where restaurant_id = \'${req.session.restoid}\'`).then(function(value){
    if(!value[0][0]){
      res.status(400).send({error: 'No such restaurant.'});
    }
    else {
      knex.raw(`select * from meals where resto_id = \'${req.session.restoid}\'`).then(function(value){
        if(!value[0][0]){
          res.status(400).send({error: 'Restaurant is not selling meals now.'});
        }
        else res.send(value[0]);
      }).catch(function(error){
        res.status(500).send(error);
      })
    }
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.get('/getMeals/:resto_id', function(req, res) {
  if(!req.params.resto_id){
    res.status(400).send({error: 'missing restaurant id'});
  }
  knex.raw(`select * from restaurants where restaurant_id = \'${req.params.resto_id}\'`).then(function(value){
    if(!value[0][0]){
      res.status(400).send({error: 'No such restaurant.'});
    }
    else {
      knex.raw(`select * from meals where resto_id = \'${req.params.resto_id}\'`).then(function(value){
        if(!value[0][0]){
          res.status(400).send({error: 'Restaurant is not selling meals now.'});
        }
        else res.send(value[0]);
      }).catch(function(error){
        res.status(500).send(error);
      })
    }
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.get('/getMeal/:meal_id', function(req, res) {
  knex.raw(`select * from meals where meal_id = \'${req.params.meal_id}\'`).then(function(value){
    if(!value[0][0]){
      res.status(400).send({error: 'Meal not found.'});
    }
    else {
        res.send(value[0]);
    }
  }).catch(function(error){
      res.status(500).send(error);
    })
})

/**
  * RESERVATION FUNCTIONS
  * - newReservation
  * - editReservationTime
  * - getAllReservations
  * - getReservations/resto_id
  */

app.post('/newReservation', function(req, res) {

  if(!req.body.customer_id){
    res.status(400).send({error: 'missing customer id'});
  }
  else if(!req.body.resto_id){
    res.status(400).send({error: 'missing restaurant id'});
  } 
  else if(!req.body.resdate){
    res.status(400).send({error: 'missing date'});
  }

  params= [req.body.customer_id, req.body.customer_name, req.body.resto_id, req.body.resto_name, req.body.resdate]
  var current;
  var dateTime;
  var max;
  console.log(req.body.resdate);

  let checkReservationPromise = new Promise(function(resolve, reject){//add \/ limit
    knex.raw(`select opening, closing, max_daily from restaurants where restaurant_id = ${req.body.resto_id}`).then(function(value){
      if(!value){
        res.status(400).send({error: 'Invalid input'});
      }
      else{
        max = value[0][0].max_daily;
        dateTime = req.body.resdate.split("T");
        params[4] = dateTime[0] +" "+dateTime[1];
        console.log(dateTime);
        console.log(params[3] +' params3');
        console.log(dateTime[1]);
        console.log(value[0][0].opening);
        resolve((dateTime[1] > value[0][0].opening) && (dateTime[1] < value[0][0].closing));
      }
    }).catch(function(error){
        res.status(500).send(error);
      })
  }).then(function(check){
    if(!check){
      res.send({error: 'Restaurant is closed at that time.'});
    }
    else{
      knex.raw(`SELECT COUNT(DATE(reservation_date)) as count FROM reservations WHERE DATE_FORMAT(reservation_date, '%Y-%m-%d') = \'${dateTime[0]}\' GROUP BY DATE(reservation_date);`).then(function(value){
        if(value[0][0]==null) current = 0;
        else current = parseInt(value[0][0].count);
        if(current>max){
          res.send({error: "Sorry, that restaurant is full that day"});
        }
        else{
          console.log('got in here then will break');
          knex.raw(`INSERT INTO reservations(customer_id, customer_name, resto_id, resto_name, reservation_date) VALUES (?, ?, ?, ?, ?)`, params).then(function(value){
            res.status(200).send({reservation_id: value[0].insertId});
          }).catch(function(error){
        res.status(500).send(error);
      })
        }
      }).catch(function(error){
        res.status(500).send(error);
      })
    }
  })
})

app.put('/editReservationTime', function(req, res) {
  if(!req.body.reservation_id){
    res.status(400).send({error: 'missing reservation id'});
  } 
  else if(!req.body.resdate){
    res.status(400).send({error: 'missing date'});
  }

  var current;
  var dateTime = req.body.resdate.split(" ");
  var max;
  knex.raw(`SELECT max_daily FROM restaurants WHERE restaurant_id = ${req.body.resto_id}`).then(function(value){
    if(!value[0][0]) res.status(400).send({error: "No restaurant with that id."});
    max = value[0][0].max_daily;
  })
  .then(
    knex.raw(`SELECT COUNT(DATE(reservation_date)) as count FROM reservations WHERE DATE_FORMAT(reservation_date, '%Y-%m-%d') = \'${dateTime[0]}\' GROUP BY DATE(reservation_date);`).then(function(value){
      if(value[0][0]==null) current = 0;
      else current = parseInt(value[0][0].count);
      if(current>10){
        res.send({error: "Sorry, that restaurant is full that day"});
      }
      else{
        knex.raw(`UPDATE reservations SET reservation_date = \'${req.body.resdate}\' WHERE reservation_id = \'${req.body.reservation_id}\'`).then(function(value){
          if(value[0].affectedRows) res.status(200).send({message: "Updated Reservation Time!"});
          else res.send({error: "Reservation does not exist! Please book a reservation first."});
        }).catch(function(error){
        res.status(500).send(error);
      })
      }
    }).catch(function(error){
        res.status(500).send(error);
      }).catch(function(error){
        res.status(500).send(error);
      })
)})

app.get('/getAllReservations', function(req, res) {
  knex.raw(`select * from reservations`).then(function(value){
      res.send(value[0])
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.get('/getReservations/:resto_id', function(req, res) {
  if(!req.params.resto_id){
    res.status(400).send({error: 'missing restaurant id'});
  }
  knex.raw(`select * from restaurants where restaurant_id = \'${req.params.resto_id}\'`).then(function(value){
    if(!value[0][0]){
      res.status(400).send({error: 'No such restaurant.'});
    }
    else {
      knex.raw(`select * from reservations where resto_id = \'${req.params.resto_id}\'`).then(function(value){
        if(!value[0][0]){
          res.status(400).send({error: 'Restaurant has no reservations now.'});
        }
        else res.send(value[0])
      }).catch(function(error){
        res.status(500).send(error);
      })
    }
  }).catch(function(error){
        res.status(500).send(error);
      })
  
})

app.get('/getCustomerReservations/:cust_id', function(req, res) {
  if(!req.params.cust_id){
    res.status(400).send({error: 'missing customer id'});
  }
  knex.raw(`select * from reservations where customer_id = \'${req.params.cust_id}\'`).then(function(value){
    if(!value[0][0]){
      res.status(400).send({error: 'You have no reservations now.'});
    }
    else res.send(value[0]);
  }).catch(function(error){
    res.status(500).send(error);
  })
})

app.delete('/deleteReservation/:id', function(req, res) {
  if(!req.params.id){
    res.status(400).send({error: 'missing reservation id'});
  }
  knex.raw(`DELETE FROM reservations WHERE reservation_id = \'${req.params.id}\'`).then(function(value){
    console.log(value);
    console.log(req.params.id);
    if(value[0].affectedRows) res.status(200).send({message: "Deleted Reservation Success!"});
    else res.send({error: "Reservation does not exist."});
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.get('/getReservationsDay/:resto_id/:resdate', function(req, res) {
  var dateTime = req.params.resdate.split(" ");
  knex.raw(`select * from restaurants where restaurant_id = \'${req.params.resto_id}\'`).then(function(value){
    if(!value[0][0]){
      res.status(400).send({error: 'No such restaurant.'});
    }
    else {
      knex.raw(`select * from reservations where resto_id = \'${req.params.resto_id}\' AND DATE_FORMAT(reservation_date, '%Y-%m-%d') = \'${dateTime[0]}\'`).then(function(value){
        if(!value[0][0]){
          res.status(400).send({error: 'There are no reservations for that day'});
        }
        else res.send(value[0]);
      }).catch(function(error){
        res.status(500).send(error);
      })
    }
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.get('/getReservation/:reservation_id', function(req, res) {
  knex.raw(`select * from reservations where reservation_id = \'${req.params.reservation_id}\'`).then(function(value){
    if(!value[0][0]){
      res.status(400).send({error: 'Reservation not found.'});
    }
    else {
        res.send(value[0]);
    }
  }).catch(function(error){
      res.status(500).send(error);
    })
})

/**
  * REVIEW FUNCTIONS
  * - makeReview
  * - getAllReviews
  * - getReviews/resto_id
  */

app.post('/makeReview', function(req, res) {

  if(!req.body.customer_id){
    res.status(400).send({error: 'missing customer id'});
  }
  else if(!req.body.resto_id){
    res.status(400).send({error: 'missing restaurant id'});
  } 
  else if(!req.body.review_body){
    res.status(400).send({error: 'missing review'});
  }

  params= [req.body.review_body, req.body.customer_id, req.body.customer_name, req.body.resto_id]
  knex.raw(`select * from restaurants where restaurant_id = \'${req.body.resto_id}\'`).then(function(value){
    if(!value[0][0]){
      res.status(400).send({error: 'No such restaurant.'});
    }
    else {
      if(req.body.review_body){
        knex.raw(`INSERT INTO reviews(review_body, customer_id, customer_name, resto_id) VALUES (?, ?, ?, ?)`, params).then(function(value){
          res.status(200).send({review_id: value[0].insertId, message: "Review added! Thank you!"})
        }).catch(function(error){
          res.status(500).send(error);
        })
      }
    }
  }).catch(function(error){
        res.status(500).send(error);
      })
  
})

app.get('/getAllReviews', function(req, res) {
  knex.raw(`select * from reviews`).then(function(value){
      res.send(value[0])
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.get('/getReviews/:resto_id', function(req, res) {

  if(!req.params.resto_id){
    res.status(400).send({error: 'missing restaurant id'});
  } 
  knex.raw(`select * from reviews where resto_id = \'${req.params.resto_id}\'`).then(function(value){
    if(!value[0][0]){
      res.status(400).send({error: "No reviews :("});
    }
    else res.send(value[0])
  }).catch(function(error){
        res.status(500).send(error);
      })
})

app.listen(3000)