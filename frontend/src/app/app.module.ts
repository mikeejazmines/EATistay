import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { AppRouting2Module } from './restaurant-owner/app-routing2/app-routing2.module';
import { AppRouting3Module } from './user/app-routing3/app-routing3.module';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ToastrModule } from 'ngx-toastr';
import { UserModule } from './user/user.module';
import { UserService } from './shared/services/user.service';
import { WebsocketService } from './shared/services/websocket.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

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
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [UserService, OwnerService, CookieService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
