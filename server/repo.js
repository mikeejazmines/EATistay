const realRepo = function (knex) {
	const repo = {
        getRestaurant: (id) => {
            return new Promise((resolve, reject) => {
                knex.raw(`select * from restaurants where restaurant_id = \'${id}\'`).then(function(value){
                    return resolve(value[0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },

		makeReview: (params) => {	
            console.log(params);
            return new Promise((resolve, reject) => {
                knex.raw(`INSERT INTO reviews(review_body, customer_id, customer_name, resto_id) VALUES (?, ?, ?, ?)`, params).then(function(value){
                    return resolve({review_id: value[0].insertId, message: "Review added! Thank you!"})
                }).catch(function(error){
                    return reject(error);
                })
            })
        },

		getAllReviews: () => {
            return new Promise((resolve, reject) => {
                knex.raw(`select * from reviews`).then(function(value){
                    return resolve(value[0])
                }).catch(function(error){
                    return reject(error);
                })
            })
		},

        getReviews: (req) => { // params
            return new Promise((resolve, reject) => {
                knex.raw(`select * from reviews where resto_id = \'${req.params.resto_id}\'`).then(function(value){
                    return resolve(value[0]);
                }).catch(function(error){
                    return reject(error);
                })
            })
		}	
	}
	return repo;
}

module.exports = realRepo;