import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { OwnerService } from '../../shared/services/owner.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  constructor(private ownerService: OwnerService, private cookieService: CookieService,
    private router: Router, private route: ActivatedRoute) { }

  meals;
  username;
  restoname;
  activeMeal_name;
  activeMeal_price;
  activeMeal_description;
  activeMealID;
  id;
  errorMeals;
  addError;

  getMeals() {
    console.log('restos: ' + this.cookieService.get('restoID'));
    this.ownerService.getMeals(Number(this.cookieService.get('restoID'))).subscribe((result) => {
      this.meals = result;
    }, error => {
      this.errorMeals = error.error.error;
      console.log(error.error);
    });
  }

  editMeal(name: string, description: string, price: number) {
    this.ownerService.editMeal(name, description, price, this.activeMealID).subscribe((result) => {
      this.getMeal(this.activeMealID);
      this.getMeals();
    }, error => {
      console.log(error);
    });
  }

  delete() {
    this.ownerService.deleteMeal(this.activeMealID).subscribe((result) => {
      console.log(this.activeMealID);
      console.log(result);
      this.getMeals();
    }, error => {
      console.log(error);
    });
  }

  getMeal(id: number) {
    this.ownerService.getMeal(id).subscribe((result) => {
      this.activeMeal_name = result[0].meal_name;
      this.activeMeal_description = result[0].meal_description;
      this.activeMeal_price = result[0].meal_price;
      this.activeMealID = id;
      console.log(result[0]);
    }, error => {
      console.log(error);
    });
  }

  addMeal(name: string, description: string, price: number) {
    this.ownerService.addMeal(name, description, price).subscribe((result) => {
      this.getMeals();
      this.addError = '';
    }, error => {
      this.addError = error.error.error;
      console.log(error.error.error);
    });
  }

  ngOnInit() {
    this.username = this.cookieService.get('username');
    this.restoname = this.cookieService.get('restoName');
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getMeals();
  }

}
