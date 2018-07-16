const restaurantCtrl = function (repo) {
	const controller = {
		getRestaurants: (req, res) => {
			var queryString = "select * from restaurants";
  			var keys = Object.keys(req.query);
  			var values = Object.values(req.query);

			if (values.length >= 2 && keys[1] == "filter") {
				queryString+= ` WHERE ${values[0]} = \'${values[1]}\'`
				if (values.length > 2 && keys[2] == "sort") {
					queryString+= ` ORDER BY ${values[2]}`
				}
			}
			else if (keys[0] == "sort") {
				queryString+= ` ORDER BY ${values[0]}`
			}
			
			queryString += ";";
			
			repo.raw(queryString).then(result => {
				res.status(200).send(result[0]);
			})
			.catch(error => {
				res.status(500).send(error);
			})
		},

		getRestaurant: (req, res) => {
			if(req.params.id){
				repo.getRestaurant(req.params.id).then(result => {
					console.log(result);
					if (!result) {
						res.status(400).send({error: 'No such restaurant.'});
					} else res.status(200).send(result);
				})
				.catch (error => {
					res.status(500).send(error);
				})
			} else {
				if(!req.session.restoid){
					res.status(400);
					res.send({error: 'missing restaurant id'});
				} else {
					repo.getRestaurant(req.session.restoid).then(result => {
						if (!result) {
							res.status(400).send({error: 'No such restaurant.'});
						} else res.status(200).send(result);
					})
					.catch (error => {
						res.status(500).send(error);
					})
				}
			}
		},
        
        getMeals: (req, res) => {
			if(req.session.restoid){
				repo.getRestaurant(req.session.restoid).then(result => {
					if(!result) {
						res.status(400).send({error: 'No such restaurant.'});
					} else {
						repo.getMeals(req.session.restoid).then(mealResult => {
							console.log('first');
							console.log(mealResult);
							if (!mealResult[0]) {
								res.status(400).send({error: 'Restaurant is not selling meals now.'});
							} else {
								res.status(200).send(mealResult);
							}
						}).catch(error => {
							res.status(500).send(error);
						})
					}
				})
			} else if(req.params.resto_id){
				repo.getRestaurant(req.params.resto_id).then(result => {
					if(!result) {
						res.status(400).send({error: 'No such restaurant.'});
					} else {
						repo.getMeals(req.params.resto_id).then(mealResult => {
							console.log('second');
							console.log(mealResult);
							if (!mealResult[0]) {
								res.status(400).send({error: 'Restaurant is not selling meals now.'});
							} else {
								res.status(200).send(mealResult);
							}
						}).catch(error => {
							res.status(500).send(error);
						})
					}
				})
			} else {
				res.status(400).send({error: 'missing restaurant id'});
			}
        },

		newRestaurant: (req, res) => { //edit to session later
			params= [req.body.name, req.body.description, req.body.location, req.session.user.userID, req.body.opening, req.body.closing, req.body.limit]

			if(!req.body.name){
				res.status(400);
				res.send({error: 'missing name'});
			}
			else if(!req.body.description){
				res.status(400);
				res.send({error: 'missing description'});
			} 
			else if(!req.body.location){
				res.status(400);
				res.send({error: 'missing location'});
			}
			else if(!req.session.user.userID){
				res.status(400);
				res.send({error: 'missing owner id'});
			}
			else {
				repo.checkUser(req.session.user.userID).then(result => {
					if (!result) {
						res.send({error: "Cannot make restaurant. Please register as an owner first"});
					} else {
						repo.newRestaurant(params).then(resResult => {
							req.session.restoid = result.insertId;
							req.session.restoname = req.body.name;
							res.send({resto_id: result.insertID, name: req.body.name});
						})
						.catch(error => {
							res.status(500).send(error);
						})
					}
				})
				.catch(error => {
					res.status(500).send(error);
				})
			}
        },
        
        editDescription: (req, res) => {
			if (!req.body.description) {
				res.status(400);
				res.send({error: 'missing description'});
			} else if (!req.session.restoid) {
				res.status(400);
				res.send({error: 'You have no restaurant. Login as an owner to add a restaurant'});
			} else {
				repo.editDescription(req.session.restoid, req.body.description).then(result => {
					if (result.affectedRows) {
						res.status(200).send({message: "Updated description!"})
					} else {
						res.status(400).send({error: "Restaurant does not exist!"})
					}
			  	}).catch(function(error){
					res.status(500).send(error);
				})
			}
		},

		editLimit: (req, res) => {
			if (!req.body.limit) {
				res.status(400);
				res.send({error: 'No value for limit'});
			} else if (!req.session.restoid) {
				res.status(400);
				res.send({error: 'You have no restaurant. Login as an owner to add a restaurant'});
			} else {
				repo.editLimit(req.session.restoid, req.body.limit).then(result => {
					if (value.affectedRows) {
						res.status(200).send({message: "Updated reservation limit!"});
					} else { 
						res.status(400).send({error: "Restaurant does not exist!"})
					}
				})
				.catch(error => {
					res.status(500).send(error);
				})
			}
        },
        
        confirm: (req, res) => {
			if(!req.body.id){
				res.status(400).send({error: 'Reservation not found'});
			} else {
				repo.confirm(req.body.id).then(result => {
					if (result.affectedRows) {
						res.status(200).send({message: "Reservation is confirmed for: " +  req.body.id + "!"});
					}
					else {
						res.status(400).send({error: "Reservation does not exist!"});
					}
				})
				.catch(error => {
					res.status(500).send(error);
				})
			}
		}
		
	}
	return controller;
}

module.exports = restaurantCtrl;