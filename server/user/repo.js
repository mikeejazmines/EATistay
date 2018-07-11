const userRepo = function (knex) {
	const repo = {
		getUsers: () => {
            return new Promise((resolve, reject) => {
                knex.raw('select * from users').then(function(value){
					return resolve(value[0]);
				}).catch(error => {
					return reject(error);
				})
            })
		},
		
		getRestaurant: (id) => {
            return new Promise((resolve, reject) => {
                knex.raw(`select * from restaurants where owner_id = \'${id}\'`).then(function(value){
                    return resolve(value[0]);
                }).catch(error => {
                    return reject(error);
                })
            })
		},
		
		checkUser: (id) => {
			return new Promise((resolve, reject) => {
				knex.raw('select * from users where userid = \'${id}\'').then(function(value){
					return resolve(value[0]);
				}).catch(error => {
					return reject(error);
				})
			})
		},

		checkEmails: (email) => {
			return new Promise((resolve, reject) => {
				knex.raw(`select * from users where email = \'${email}\'`).then(function(value){
					console.log(value);
					return resolve(value[0]);
				}).catch(error => {
					return reject(error);
				})
			})
		},

		newUser: (params) => {
			return new Promise((resolve, reject) => {
				knex.raw(`INSERT INTO users(email, username, password, user_type) VALUES (?, ?, ?, ?)`, params).then(function(value){
					return resolve(value[0]);
				}).catch(error => {
					return reject(error);
				})
			})
		}
	}

	return repo;
}

module.exports = userRepo;