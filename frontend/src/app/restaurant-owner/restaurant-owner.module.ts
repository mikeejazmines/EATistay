import { AppRouting2Module } from './app-routing2/app-routing2.module';
import { CommonModule } from '@angular/common';
import { MealsComponent } from './meals/meals.component';
import { MomentModule } from 'ngx-moment';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { RestaurantOwnerComponent } from './restaurant-owner.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AppRouting2Module,
    SharedModule,
    MomentModule
  ],
  declarations: [RestaurantOwnerComponent, NavbarComponent, ProfileComponent, MealsComponent, ReservationsComponent, ReviewsComponent]
})
export class RestaurantOwnerModule { }
