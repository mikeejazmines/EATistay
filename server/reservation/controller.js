const reservationCtrl = function (repo) {
	const controller = {
		newReservation: (req, res) => {
			if(!req.body.customer_id){
        res.status(400);
        res.send({error: 'missing customer id'});
			}
			else if(!req.body.resto_id){
        res.status(400);
        res.send({error: 'missing restaurant id'});
			} 
			else if(!req.body.resdate){
        res.status(400);
        res.send({error: 'missing date'});
			}
			else {
				params= [req.body.customer_id, req.body.customer_name, req.body.resto_id, req.body.resto_name, req.body.resdate]
				var current;
				var dateTime;
				var max;

				repo.getRestaurant(req.body.resto_id).then(result => {
					if(!result){
            res.status(400).send({error: 'Invalid input'});
          } else {
            max = result[0].max_daily;
            dateTime = req.body.resdate.split("T");
            params[4] = dateTime[0] +" "+dateTime[1];
            if (!((dateTime[1] > result[0].opening) && (dateTime[1] < result[0].closing))) {
              res.status(400).send({error: 'Restaurant is closed at that time.'});
            } else {
              repo.getCount(dateTime[0]).then(dtResult => {
                if(!dtResult) {
                  current = 0;
                } else {
                  current = dtResult.count;
                }
                if(current>max){
                  res.status(400).send({error: "Sorry, that restaurant is full that day"});
                }
                else{
                  repo.newReservation(params).then(newResult => {
                    res.status(200).send(newResult);
                  }).catch(error => {
                    res.status(500).send(error);
                  })
                }
              }).catch(error => {
                res.status(500).send(error);
              })
            }
          }
				}).catch(error => {
          res.status(500).send(error);
				})
			}
		},

		editReservationTime: (req, res) => {
      if(!req.body.reservation_id){
        res.status(400).send({error: 'missing reservation id'});
      } 
      else if(!req.body.resdate){
        res.status(400).send({error: 'missing date'});
      } else {
        var current;
        var dateTime = req.body.resdate.split(" ");
        var max;
        repo.getRestaurant(req.body.resto_id).then(result => {
          if(!result[0]) res.status(400).send({error: "No restaurant with that id."});
          max = result[0].max_daily;

          repo.getCount(dateTime[0]).then(dtResult => {
            if(!dtResult) {
              current = 0;
            } else {
              current = dtResult.count;
            }
            if(current>max){
              res.status(400).send({error: "Sorry, that restaurant is full that day"});
            }
            else{
              repo.updateReservation(req).then(newResult => {
                if(newResult.affectedRows) res.status(200).send({message: "Updated Reservation Time!"});
                else res.status(400).send({error: "Reservation does not exist! Please book a reservation first."});
              }).catch(error => {
                res.status(500).send(error);
              })
            }
          }).catch(error => {
            res.status(500).send(error);
				  })
        })
      }
		},

		getAllReservations: (req, res) => {
			repo.getAllReservations().then(result => {
				res.send(result);
			}).catch(error => {
				res.status(500).send(error);
			})
    },
        
    getReservations: (req, res) => { //params
      if(!req.params.resto_id){
        res.status(400).send({error: 'missing restaurant id'});
      } else {
        repo.getRestaurant(req.params.resto_id).then(result => {
          if(!result[0]) res.status(400).send({error: "No restaurant with that id."});
          else {
            repo.getReservations(req.params.resto_id).then(resResult => {
              if(!resResult[0]) {
                res.status(400).send({error: 'Restaurant has no reservations now.'});
              } else res.send(resResult)
            }).catch(error => {
              res.status(500).send(error);
            })
          }
        }).catch(error => {
          res.status(500).send(error);
				})
      }
    },
        
    getCustomerReservations: (req, res) => { //params
      if(!req.params.cust_id){
        res.status(400).send({error: 'missing customer id'});
      } else {
        repo.getCustomerReservations(req.params.cust_id).then(resResult => {
          if(!resResult[0]) {
            res.status(400).send({error: 'You have no reservations now.'});
          } else res.send(resResult)
        }).catch(error => {
          res.status(500).send(error);
        })
      }
		},

		deleteReservation: (req, res) => { //params
      if(!req.params.id){
        res.status(400).send({error: 'missing reservation id'});
      } else {
        repo.deleteReservation(req).then(result => {
					if(result.affectedRows) {
						res.status(200).send({message: "Deleted Reservation Success!"});
					} else res.status(400).send({error: "Reservation does not exist."});
				})
      }
    },
        
    getReservationsDay: (req, res) => { //params
      var dateTime = req.params.resdate.split(" ");
      repo.getRestaurant(req.params.resto_id).then(result => {
        if(!result[0]) res.status(400).send({error: "No restaurant with that id."});
        else {
          repo.getReservationsDay(req.params.resto_id, dateTime[0]).then(resResult => {
            if(!resResult[0]) {
              res.status(400).send({error: 'There are no reservations for that day'});
            } else {
              res.status(200).send(resResult);
            }
          }).catch(error => {
            res.status(500).send(error);
          })
        }
      }).catch(error => {
        res.status(500).send(error);
      })
    },
    
    getReservation: (req, res) => {
      repo.getReservation(req.params.reservation_id).then(result => {
        if(!result[0]){
          res.status(400).send({error: 'Reservation not found.'});
        }
        else {
          res.send(result);
        }
      })
    }
	}

	return controller;
}

module.exports = reservationCtrl;