import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  errorMessage;

  ngOnInit() {
    if (!this.cookieService.get('userID')) {
      this.cookieService.deleteAll();
      this.userService.logout().subscribe((result) => {
        console.log(result);
      }, error => {
        console.log(error);
      });
    }
  }
  login(email: string, password: string) {
    this.userService.login(email, password).subscribe((result) => {
      this.cookieService.set( 'userID', result.userID );
      this.cookieService.set( 'username', result.username );
      this.cookieService.set( 'userType', result.usertype );
      if (result.usertype === 'o') {
        console.log('entered');
        this.userService.setRestoID().subscribe((res) => {
          console.log('LOGIN: ' + res.restaurant_id);
          this.cookieService.set('restoID', res.restaurant_id);
          this.cookieService.set('restoName', res.restaurant_name);
          this.router.navigateByUrl('/dashboard');
        }, error => {
          console.log(error);
          console.log(error.error);
        });
      } else {
        this.router.navigateByUrl('/home');
      }
    }, error => {
      this.errorMessage = error.error.error;
      console.log(error.error.error);
    });
  }
  setRestoID() {
    this.userService.setRestoID().subscribe((result) => {
      console.log(result);
      this.cookieService.set('restoid', result.restaurant_id);
      console.log('Set restaurant id!');
    }, error => {
      console.log('hello test');
    });
  }
  checkLogin() {
    this.userService.checkLogin().subscribe((result) => {
      console.log(result);
    }, error => {
      console.log('hello test');
    });
  }
}
