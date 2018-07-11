const mealRepo = function (knex) {
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
        
		addMeal: (params) => {	
            return new Promise((resolve, reject) => {
                knex.raw(`INSERT INTO meals(meal_name, meal_price, meal_description, resto_id) VALUES (?, ?, ?, ?)`, params).then(function(value){
                    return resolve({meal_id: value[0].insertId});
                }).catch(error => {
                    return reject(error);
                })
            })
        },

        editMeal: (params) => {	
            return new Promise((resolve, reject) => {
                knex.raw(`UPDATE meals SET meal_price = ?, meal_description = ?, meal_name = ? WHERE meal_id = ?`, params).then(function(value){
                    return resolve(value[0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },

        deleteMeal: (req) => {	
            return new Promise((resolve, reject) => {
                knex.raw(`DELETE FROM meals WHERE meal_id = \'${req.params.id}\'`).then(function(value){
                    return resolve(value[0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },

        getAllMeals: () => {
            return new Promise((resolve, reject) => {
                knex.raw(`select * from meals`).then(function(value){
                    return resolve(value[0]);
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

        getMeal: (id) => {
            return new Promise((resolve, reject) => {
                knex.raw(`select * from meals where meal_id = \'${id}\'`).then(function(value){
                    return resolve(value[0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        }
	}
	return repo;
}

module.exports = mealRepo;