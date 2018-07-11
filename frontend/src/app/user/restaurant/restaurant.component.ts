import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { OwnerService } from '../../shared/services/owner.service';
import { UserService } from '../../shared/services/user.service';

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
    private router: Router, private route: ActivatedRoute) { }


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
    console.log('check');
    console.log(this.activeRestaurant.restaurant_name);
    let q = new Date();
    let date = new Date( q.getFullYear(), q.getMonth(), q.getDate(), q.getHours(), q.getMinutes(), q.getSeconds());
    let reservationDate = new Date(dt);
    console.log(reservationDate > date);
    console.log(date);
    if (reservationDate > date) {
      this.userService.setReservation(dt, this.cookieService.get('username'),
      Number(this.cookieService.get('userID')), this.activeRestaurant.restaurant_name, this.id).subscribe((result) => {
        console.log(result);
        this.addError = '';
      }, error => {
        this.addError = error.error.error;
        console.log(error);
      });
    } else {
      this.addError = 'Please reserve a time in the future.'
    }
  }

  sendReview(review: string) {
    this.userService.sendReview(review, Number(this.cookieService.get('userID')),
    this.cookieService.get('username'), this.id).subscribe((result) => {
      this.addError = '';
      this.getReviews();
      console.log(result);
    }, error => {
      this.addError = error.error.error;
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
