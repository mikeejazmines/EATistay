import { AppComponent } from './app.component';
import { AppRouting2Module } from './restaurant-owner/app-routing2/app-routing2.module';
import { AppRouting3Module } from './user/app-routing3/app-routing3.module';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MomentModule } from 'ngx-moment';
import { NgModule } from '@angular/core';
import { OwnerService } from './shared/services/owner.service';
import { RestaurantOwnerModule } from './restaurant-owner/restaurant-owner.module';
import { RestaurantSignupComponent } from './restaurant-signup/restaurant-signup.component';
import { SharedModule } from './shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import { UserModule } from './user/user.module';
import { UserService } from './shared/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RestaurantSignupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppRouting2Module,
    AppRouting3Module,
    RestaurantOwnerModule,
    UserModule,
    SharedModule,
    FormsModule,
    MomentModule,
  ],
  providers: [UserService, OwnerService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
