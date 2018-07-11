import { Component, OnInit } from '@angular/core';

import { FilterPipe } from '../../filter.pipe';
import { RestaurantService } from '../../shared/services/restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FilterPipe],
})
export class HomeComponent implements OnInit {

  constructor(private restaurantService: RestaurantService, private pipe: FilterPipe) { }

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
