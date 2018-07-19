import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { OwnerService } from '../../shared/services/owner.service';
import { Router } from '@angular/router';
import { WebsocketService } from '../../shared/services/websocket.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private ownerService: OwnerService, private socket: WebsocketService,
    private cookieService: CookieService, private router: Router) { }

  meals;
  reservations;
  details;
  reviews;

  username;
  restaurant_name;
  description;
  opening;
  closing;
  location;
  numreservations = 0;
  nextreservation;
  futureReservations;

  getMeals(id: number) {

    this.ownerService.getMeals(id).subscribe((result) => {
      this.meals = result;
      console.log(result);
    }, error => {
      console.log(error);
      console.log('hello test');
    });

  }

  getReservations(id: number) {
    this.futureReservations = [];
    this.ownerService.getReservations(id).subscribe((result) => {
      this.reservations = result;
      length = Object.keys(this.reservations).length;

      const q = new Date();
      const date = new Date(q.getFullYear(), q.getMonth(), q.getDate(), q.getHours(), q.getMinutes(), q.getSeconds());

      for (let i = 0; i < length; i++) {
        const mydate = new Date(this.reservations[i].reservation_date);
        if (mydate >= date) {
          this.futureReservations.push(this.reservations[i]);
          this.numreservations++;
        }
      }
      this.nextreservation = this.futureReservations[0];
      console.log(result);
    }, error => {
      console.log(error);
      console.log('hello test');
    });
  }

  getReviews(id: number) {
    this.ownerService.getReviews(id).subscribe((result) => {
      this.reviews = result;
      console.log(result);
    }, error => {
      console.log(error);
      console.log('hello test');
    });
  }

  getRestaurant(id: number) {
    this.ownerService.getRestaurant(id).subscribe((result) => {
      this.details = result;
      this.username = this.cookieService.get('username');
      this.restaurant_name = this.details.restaurant_name;
      this.description = this.details.restaurant_description;
      this.opening = this.details.opening;
      this.closing = this.details.closing;
      this.location = this.details.restaurant_location;
      console.log(result);
    }, error => {
      console.log(error);
      console.log('hello test');
    });
  }

  ngOnInit() {
    if (!this.cookieService.get('restoID')) {
      this.router.navigateByUrl('/');
    } else {
      this.getMeals(Number(this.cookieService.get('restoID')));

      this.getReservations(Number(this.cookieService.get('restoID')));

      this.getRestaurant(Number(this.cookieService.get('restoID')));

      this.getReviews(Number(this.cookieService.get('restoID')));
    }
    this.socket.getResponse().subscribe((res) => {
      console.log(res);
      if (Number(this.cookieService.get('restoID')) === res.response.id) {
        if (res.response.type === 'reservation') {
          this.numreservations++;
        }
      }
    });
  }

}
