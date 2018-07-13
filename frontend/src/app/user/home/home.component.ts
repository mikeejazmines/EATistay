import { Component, OnInit } from '@angular/core';

import { CookieService } from '../../../../node_modules/ngx-cookie-service';
import { FilterPipe } from '../../filter.pipe';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FilterPipe],
})
export class HomeComponent implements OnInit {

  constructor(private restaurantService: RestaurantService, private cookieService: CookieService,
    private pipe: FilterPipe, private router: Router) { }

  restaurants;

  getRestaurants() {

    this.restaurantService.getRestaurants().subscribe((result) => {
      this.restaurants = result;
      console.log(result);
    }, error => {
      console.log(error);
      console.log('hello test');
    });

  }

  ngOnInit() {
      this.getRestaurants();
  }

}
