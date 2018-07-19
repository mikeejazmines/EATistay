const reservationRepo = function (knex) {
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

        getCount: (dt) => {
            return new Promise((resolve, reject) => {
                knex.raw(`SELECT COUNT(DATE(reservation_date)) as count FROM reservations WHERE DATE_FORMAT(reservation_date, '%Y-%m-%d') = \'${dt}\' GROUP BY DATE(reservation_date);`).then(function(value){
                    return resolve(value[0][0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },
        
		newReservation: (params) => {	
            return new Promise((resolve, reject) => {
                knex.raw(`INSERT INTO reservations(customer_id, customer_name, resto_id, resto_name, reservation_date) VALUES (?, ?, ?, ?, ?)`, params).then(function(value){
                    return resolve(params, {reservation_id: value[0].insertId});
                }).catch(error => {
                    return reject(error);
                })
            })
        },

        updateReservation: (req) => {	
            return new Promise((resolve, reject) => {
                knex.raw(`UPDATE reservations SET reservation_date = \'${req.body.resdate}\' WHERE reservation_id = \'${req.body.reservation_id}\'`).then(function(value){
                    return resolve(value[0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },

        deleteReservation: (req) => {	
            return new Promise((resolve, reject) => {
                knex.raw(`DELETE FROM reservations WHERE reservation_id = \'${req.params.id}\'`).then(function(value){
                    return resolve(value[0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },

        getAllReservations: () => {
            return new Promise((resolve, reject) => {
                knex.raw(`select * from reservations`).then(function(value){
                    return resolve(value[0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },

        getReservations: (id) => {
            return new Promise((resolve, reject) => {
                knex.raw(`select * from reservations where resto_id = \'${id}\'`).then(function(value){
                    return resolve(value[0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },

        getReservationsDay: (id, dt) => {
            return new Promise((resolve, reject) => {
                knex.raw(`select * from reservations where resto_id = \'${req.params.resto_id}\' AND DATE_FORMAT(reservation_date, '%Y-%m-%d') = \'${dateTime[0]}\'`).then(function(value){
                    return resolve(value[0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },

        getReservation: (id) => {
            return new Promise((resolve, reject) => {
                knex.raw(`select * from reservations where reservation_id = \'${id}\'`).then(function(value){
                    return resolve(value[0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },

        getCustomerReservations: (id) => {
            return new Promise((resolve, reject) => {
                knex.raw(`select * from reservations where customer_id = \'${id}\'`).then(function(value){
                    return resolve(value[0]);
                }).catch(error => {
                    return reject(error);
                })
            })
        },
	}
	return repo;
}

module.exports = reservationRepo;