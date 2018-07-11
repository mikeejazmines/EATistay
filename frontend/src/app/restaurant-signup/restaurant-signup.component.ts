import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-restaurant-signup',
  templateUrl: './restaurant-signup.component.html',
  styleUrls: ['./restaurant-signup.component.css']
})
export class RestaurantSignupComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  nameError;
  descriptionError;
  locationError;
  openingError;
  closingError;
  limitError;

  ngOnInit() {
  }

  restaurantSignup(name: string, description: string, location: string,
    opening: string, closing: string, limit: string) {
      if (!description) {
        this.descriptionError = 'Please input a description.';
      }
      if (!location) {
        this.locationError = 'Please input a location.';
      }
      if (!name) {
        this.nameError = 'Please input a name.';
      }
      if (!closing) {
        this.closingError = 'Please input a closing.';
      }
      if (!limit) {
        this.limitError = 'Please input a limit.';
      }
      if (!opening) {
        this.openingError = 'Please input an opening.';
      }
      this.userService.addNewRestaurant(name, description, location, this.cookieService.get('userID'),
      opening, closing, limit).subscribe((result) => {

        this.userService.setRestoID().subscribe((res) => {
          this.cookieService.set('restoID', res.restaurant_id);
          this.cookieService.set('restoName', res.restaurant_name);
          this.router.navigateByUrl('/dashboard');
        }, error => {
          console.log(error.error.error);
        });
      console.log(result);
    }, error => {
      console.log(error.error.error);
    });
  }

}
