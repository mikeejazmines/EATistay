import { Component, Input, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router, private userService: UserService) { }

  username;
  restoname;

  ngOnInit() {
    this.username = this.cookieService.get('username');
    this.restoname = this.cookieService.get('restoName');
  }

  logout() {
    this.userService.logout().subscribe((result) => {
      this.cookieService.deleteAll();
      console.log(result);
      this.router.navigateByUrl('/');
    }, error => {
      console.log(error);
    });
  }
}
