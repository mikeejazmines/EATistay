import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { OwnerService } from '../../shared/services/owner.service';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { UserService } from '../../shared/services/user.service';
import { WebsocketService } from '../../shared/services/websocket.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  id;
  activeRestaurant;
  meals;
  reviews;
  addError;

  constructor(private ownerService: OwnerService, private userService: UserService, private cookieService: CookieService,
    private toaster: ToastrService,
    private router: Router, private route: ActivatedRoute, private socket: WebsocketService) { }


  setProperties(id: number) {
    this.ownerService.getRestaurant(id).subscribe((result) => {
      this.activeRestaurant = result;
      console.log(result);
      console.log(this.activeRestaurant);
    }, error => {
      console.log(error);
    });
  }

  getMeals() {
    this.ownerService.getMeals(this.id).subscribe((result) => {
      this.meals = result;
    }, error => {
      console.log(error);
    });
  }

  getReviews() {
    this.ownerService.getReviews(this.id).subscribe((result) => {
      this.reviews = result;
    }, error => {
      console.log(error);
    });
  }

  setReservation(dt: string) {
    const q = new Date();
    const date = new Date( q.getFullYear(), q.getMonth(), q.getDate(), q.getHours(), q.getMinutes(), q.getSeconds());
    const reservationDate = new Date(dt);
    if (reservationDate > date) {
      this.userService.setReservation(dt, this.cookieService.get('username'),
      Number(this.cookieService.get('userID')), this.activeRestaurant.restaurant_name, this.id).subscribe((result) => {
        console.log(result);
        this.socket.sendUserResponse({id: this.id, type: 'reservation',
        message: `${this.cookieService.get('username')} booked a reservation!`});
        this.toaster.success('Booked a reservation', 'Success!', {
          closeButton: true,
          timeOut: 2000,
        });
        this.addError = '';
      }, error => {
        this.addError = error.error.error;
        console.log(error);
      });
    } else {
      this.toaster.error('Please reserve a time in the future.', 'Error!', {
        closeButton: true
      });
      // this.addError = 'Please reserve a time in the future.';
    }
  }

  sendReview(review: string) {
    this.userService.sendReview(review, Number(this.cookieService.get('userID')),
    this.cookieService.get('username'), this.id).subscribe((result) => {
      this.addError = '';
      this.socket.sendUserResponse({id: this.id, type: 'review', message: `${this.cookieService.get('username')} left a review!`});
      this.getReviews();
      this.toaster.success('Left a review!', 'Success!', {
        closeButton: true,
        timeOut: 2000,
      });
      console.log(result);
    }, error => {
      // this.addError = error.error.error;
      this.toaster.error(error.error.error, 'Error!', {
        closeButton: true
      });
      console.log(error);
    });
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.setProperties(this.id);
    this.getMeals();
    this.getReviews();
  }

}
