import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private cookieService: CookieService, private userService: UserService) { }

  name;
  reservations;
  errorText;

  getReservations() {
    this.userService.getCustomerReservations(Number(this.cookieService.get('userID'))).subscribe((result) => {
      this.reservations = result;
      console.log(result);
      this.errorText = '';
    }, error => {
      this.errorText = error.error.error;
      console.log(error);
    });
  }

  delete(id: number) {
    this.userService.deleteReservation(id).subscribe((result) => {
      console.log(id);
      console.log(result);
      this.getReservations();
    }, error => {
      this.errorText = error.error.error;
      console.log(error);
    });
  }

  ngOnInit() {
    this.name = this.cookieService.get('username');
    this.getReservations();
  }

}
