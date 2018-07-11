const userCtrl = function (repo, bcrypt, session) {
	const controller = {
		getUsers: (req, res) => {
			repo.getUsers().then(result => {
				res.status(200).send(result);
			}).catch(error => {
				res.status(500).send(error);
			})
		},

		newUser: (req, res) => {
			if(!req.body.email){
				res.status(400).send({error: 'missing email'});
			}
			else if (!req.body.password){
				res.status(400).send({error: 'missing password'});
			}
			else if(!req.body.name){
				res.status(400).send({error: 'missing password'});
			} else {
				var type;
			  	if (req.body.type == 'customer') {
					type = 'c';
			  	} else if(req.body.type == 'owner') {
					type = 'o';
			  	}
				  
				params= [req.body.email, req.body.name, null, type];
			
			  	repo.checkEmails(req.body.email).then(result => {
					if(result[0]) {
						res.status(400).send({error: "Email in use"});
					} else {
						bcrypt.genSalt(10, function(err, salt) {
							bcrypt.hash(req.body.password, salt, function(err, hash) {
								params[2] = hash;
								repo.newUser(params).then(result => {
									req.session.user = ({userID: result.insertId, username: req.body.name, usertype: type});
									res.status(200).send(req.session.user);
								}).catch(error => {
									res.status(500).send(error);
								})
							})
						})
					}
				}).catch(error => {
					res.status(500).send(error);
				})
			}
		},

		login: (req, res) => {
			repo.checkEmails(req.body.email).then(result => {
				if(!result[0]) {
					res.status(400).send({error: 'Wrong login details'});
				} else {
					bcrypt.compare(req.body.password, result[0].password).then((hashresult) => {
						if(hashresult){
						  req.session.user = ({userID: result[0].userid, username: result[0].username, usertype: result[0].user_type});
						  console.log(req.session.user.userID);
						  res.status(200).send(req.session.user);
						} else {
						  res.status(400).send({error: 'Wrong login details'});
						}
						return hashresult;
					}).catch(function(error){
						res.status(500).send(error);
					})
				}
			}).catch(error => {
				res.status(500).send(error);
			})
		},

		setRestoID: (req, res) => {
			if(!req.session.user.userID){
				res.status(400).send({error: "No user ID"});
			} else {
				repo.getRestaurant(req.session.user.userID).then(result => {
					if (!result[0]) {
						res.status(400).send({error: 'No such restaurant.'});
					} else {
						req.session.restoid = result[0].restaurant_id;
						req.session.restoname = result[0].restaurant_name;
						res.status(200).send(result[0]);
					}
				}).catch(error => {
					res.status(500).send(error);
				})
			}
		},

		logout: (req, res) => {
			if(!req.session.user.userID){
				res.status(400).send({error: "You are not logged in"});
			}
			else {
				req.session.destroy();
				res.status(200).send({message: "Logged out"});
			}
		},

		checkSession: (req, res) => {
			res.status(200).send({user: req.session});
		},

		checkUser: (req, res) => {
			knex.raw('select * from users where userid = \'${req.params.id}\'').then(function(value){
				res.status(200).send(value[0]);
			}).catch(console.log)
		},	
	}

	return controller;
}

module.exports = userCtrl;