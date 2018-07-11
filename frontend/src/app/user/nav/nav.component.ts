import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router, private userService: UserService) { }

  ngOnInit() {
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
