import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../../login/login.component';
import { MealsComponent } from '../meals/meals.component';
import { NgModule } from '@angular/core';
import { ReservationsComponent } from '../reservations/reservations.component';
import { RestaurantOwnerComponent } from '../restaurant-owner.component';
import { ReviewsComponent } from '../reviews/reviews.component';

const secondaryRoutes: Routes = [
  { path: 'dashboard',  component: RestaurantOwnerComponent },
  { path: 'meals/:id',  component: MealsComponent },
  { path: 'meals',  component: MealsComponent },
  { path: 'reservations',  component: ReservationsComponent },
  { path: 'reservations/:id',  component: ReservationsComponent },
  { path: 'reviews',  component: ReviewsComponent },
  { path: '',  component: LoginComponent },
];


@NgModule({
  imports: [
    RouterModule.forChild(secondaryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouting2Module { }
