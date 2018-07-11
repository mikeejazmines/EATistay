const reviewCtrl = function (repo) {
	const controller = {
		makeReview: (req, res) => {
			console.log(req.body);
			if(!req.body.customer_id){
				res.status(400).send({error: 'missing customer id'});
			}
			else if(!req.body.resto_id){
				res.status(400).send({error: 'missing restaurant id'});
			} 
			else if(!req.body.review_body){
				res.status(400).send({error: 'missing review'});
			}
			else {
				params= [req.body.review_body, req.body.customer_id, req.body.customer_name, req.body.resto_id]
				
				repo.getRestaurant(req.body.resto_id).then(result => {
					if (!result) {
						res.status(400).send({error: 'No such restaurant.'});
					} else {
						console.log('before review');
						repo.makeReview(params).then(result => {
							res.status(200).send(result);
						})
						.catch(error => {
							console.log('error');
							res.status(500).send(error);
						})
					}
				}).catch(error => {
					console.log('second error');
					res.status(500).send({error});
				})
			}
		},

		getAllReviews: (req, res) => {
			repo.getAllReviews().then(result => {
				res.status(200).send(result);
			})
			.catch(error => {
				res.status(500).send(error);
			})
		},

		getReviews: (req, res) => { // params
			if(!req.params.resto_id){
				res.status(400).send({error: 'missing restaurant id'});
			} else {
				repo.getReviews(req).then(result => {
					if (!result[0]) {
						res.status(400).send({error: 'No reviews.'});
					} else {
						res.status(200).send(result);
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

module.exports = reviewCtrl;