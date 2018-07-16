const mealCtrl = function (repo) {
	const controller = {
		addMeal: (req, res) => {
			if(!req.body.meal_name){
				res.status(400);
				res.send({error: 'missing name'});
			} else if(!req.body.meal_description){
				res.status(400);
				res.send({error: 'missing description'});
			} else if(!req.body.meal_price){
				res.status(400);
				res.send({error: 'missing price'});
			} else if(!req.session.restoid){
				res.status(400);
				res.send({error: 'You have no restaurant. Login as an owner to add a restaurant'});
			} else {
				params= [req.body.meal_name, req.body.meal_price, req.body.meal_description, req.session.restoid]

				repo.getRestaurant(req.session.restoid).then(result => {
					console.log(result);
					if(!result[0]){
						res.status(400).send({error: 'No such restaurant.'});
					}
					else {
						repo.addMeal(params).then(addResult => {
							res.status(200).send(addResult);
						}).catch(error => {
							res.status(500).send(error);
						})
					}
				}).catch(error => {
					res.status(500).send(error);
				})
			}
		},

		editMeal: (req, res) => {
			params = [req.body.price, req.body.description, req.body.name, req.body.meal_id]
			if(!req.body.price){
				res.status(400);
				res.send({error: 'missing price'});
			}
			else if(!req.body.description){
				res.status(400);
				res.send({error: 'missing description'});
			}
			else if(!req.body.name){
				res.status(400);
				res.send({error: 'missing name'});
			}
			else if(!req.body.meal_id){
				res.status(400);
				res.send({error: 'missing meal id'});
			} else {
				repo.editMeal(params).then(result => {
					if (result.affectedRows) {
						res.status(200).send({message: "Update Success!"});
					} else {
						res.status(400).send({error: "Meal does not exist!"})
					}
				}).catch(error => {
					res.status(500).send(error);
				})			
			}
		},

		deleteMeal: (req, res) => { // params
			if(!req.params.id){
				res.status(400);
				res.send({error: 'missing meal id'});
			} else {
				repo.deleteMeal(req).then(result => {
					if(result.affectedRows) {
						res.status(200).send({message: "Deleted Meal Success!"});
					} else res.status(400).send({error: "Meal does not exist."});
				})
			}
        },
        
        getAllMeals: (req, res) => {
			repo.getAllMeals().then(result => {
				res.send(result);
			}).catch(error => {
				res.status(500).send(error);
			})
        },
        
        getMeals: (req, res) => {
			if(!req.params.resto_id){
				res.status(400);
				res.send({error: 'missing restaurant id'});
			} else {
				repo.getRestaurant(req.params.resto_id).then(result => {
					console.log(result);
					if(!result[0]){
						res.status(400).send({error: 'No such restaurant.'});
					}
					else {
						repo.getMeals(req.params.resto_id).then(mealRes => {
							if(!mealRes[0]) {
								res.status(400).send({error: 'Restaurant is not selling meals now.'});
							} else {
								res.status(200).send(mealRes);
							}
						}).catch(error => {
							res.status(500).send(error);
						})
					}
				}).catch(error => {
					res.status(500).send(error);
				})
			}	  
		},
        
		getMeal: (req, res) => {
			if(!req.params.meal_id){
				res.status(400);
				res.send({error: 'missing meal id'});
			} else {
				console.log('MEAL');
				repo.getMeal(req.params.meal_id).then(result => {
					console.log(result);
					if(!result[0]){
						res.status(400).send({error: 'Meal not found.'});
					}
					else {
						res.send(result);
				  	}
				}).catch(error => {
					res.status(500).send(error);
				})
			}
		}
	}

	return controller;
}

module.exports = mealCtrl;