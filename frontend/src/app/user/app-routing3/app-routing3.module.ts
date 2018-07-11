import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { RestaurantComponent } from '../restaurant/restaurant.component';

const secondaryRoutes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'restaurant/:id',  component: RestaurantComponent },
  { path: 'restaurant',  component: HomeComponent },
  { path: 'profile',  component: ProfileComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(secondaryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouting3Module { }
