import { AppRouting3Module } from './app-routing3/app-routing3.module';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../filter.pipe';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MomentModule } from 'ngx-moment';
import { NavComponent } from './nav/nav.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

@NgModule({
  imports: [
    CommonModule,
    AppRouting3Module,
    FormsModule,
    MomentModule
  ],
  declarations: [NavComponent, HomeComponent, RestaurantComponent, ProfileComponent, FilterPipe]
})
export class UserModule { }
