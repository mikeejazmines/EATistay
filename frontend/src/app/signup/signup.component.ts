import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  selectedType = '';
  signupStatus = false;
  errorMessage;
  nameError;
  passwordError;
  emailError;

  ngOnInit() {
  }

  signup(email: string, password: string, name: string) {
    this.errorMessage = '';
    this.nameError = '';
    this.passwordError = '';
    this.emailError = '';
    if (!email) {
      this.emailError = 'Please input an email.';
    }
    if (!password) {
      this.passwordError = 'Please input a password.';
    }
    if (!name) {
      this.nameError = 'Please input a name.';
    }
    this.userService.signup(email, password, name, this.selectedType).subscribe((result) => {
      if (result.usertype === 'o') {
        this.cookieService.set( 'userID', result.userID );
        this.cookieService.set( 'username', result.username );
        this.router.navigateByUrl('/restaurantSignup');
      } else {
        this.signupStatus = true;
        this.errorMessage = '';
      }
      console.log(result);
    }, error => {
      this.errorMessage = error.error.error;
      console.log(error.error.error);
    });
  }

  eventHandler (event: any) {
    this.selectedType = event.target.value;
  }

}
