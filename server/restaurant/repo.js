const restoRepo = function (knex) {
	const repo = {
        raw: (str) => {
            return new Promise((resolve, reject) => {
                knex.raw(str).then(function(value){
                    return resolve(value);
                }).catch(error => {
                    return reject(error);
                })
            })
        },

		getRestaurant: (id) => {	
            return new Promise((resolve, reject) => {
                knex.raw(`select * from restaurants where restaurant_id = \'${id}\'`).then(function(value){
                    return resolve(value[0][0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },

        getMeals: (id) => {
            return new Promise((resolve, reject) => {
                knex.raw(`select * from meals where resto_id = \'${id}\'`).then(function(value){
                    return resolve(value[0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },

        checkUser: (id) => {	
            return new Promise((resolve, reject) => {
                knex.raw(`SELECT * FROM users WHERE userid = ${id} AND user_type = \'o\'`).then(function(value){
                    return resolve(value[0][0]);
                }).catch(function(error){
                    return reject(error);
                })
            })
        },

        newRestaurant: (params) => {	
            return new Promise((resolve, reject) => {
                knex.raw(`INSERT INTO restaurants(restaurant_name, restaurant_description, restaurant_location, owner_id, opening, closing, max_daily) VALUES (?, ?, ?, ?, ?, ?, ?)`, params).then(function(value){
                    return resolve(value[0]);
                }).catch(function(error){
                    return reject(error);
                })
            })
        },

        editDescription: (id, description) => {	
            return new Promise((resolve, reject) => {
                knex.raw(`UPDATE restaurants SET restaurant_description = \'${description}\' WHERE restaurant_id = \'${id}\'`).then(function(value){
                    return resolve(value[0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },

        editLimit: (limit, id) => {
            return new Promise((resolve, reject) => {
                knex.raw(`UPDATE restaurants SET max_daily = \'${limit}\' WHERE restaurant_id = \'${id}\'`).then(function(value){
                    return resolve(value[0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },

        confirm: (id) => {
            return new Promise((resolve, reject) => {
                knex.raw(`UPDATE reservations SET confirmation = \'1\' WHERE reservation_id = \'${id}\'`).then(function(value){
                    return resolve(value[0]);
                  }).catch(error => {
                    return reject(error);
                  })
            })
        },

        getMeal: (id) => {
            return new Promise((resolve, reject) => {
                knex.raw(`select * from meals where resto_id = \'${id}\'`).then(function(value){
                    return resolve(value[0][0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },
	}
	return repo;
}

module.exports = restoRepo;