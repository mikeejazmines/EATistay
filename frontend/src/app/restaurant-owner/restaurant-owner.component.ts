import { Component, OnInit } from '@angular/core';

import { CookieService } from '../../../node_modules/ngx-cookie-service';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { WebsocketService } from '../shared/services/websocket.service';

@Component({
  selector: 'app-restaurant-owner',
  templateUrl: './restaurant-owner.component.html',
  styleUrls: ['./restaurant-owner.component.css']
})
export class RestaurantOwnerComponent implements OnInit {

  constructor(private socket: WebsocketService, private toast: ToastrService, private cookieService: CookieService) { }

  ngOnInit() {
    this.socket.getResponse().subscribe((res) => {
      console.log(res);
      if (Number(this.cookieService.get('restoID')) === res.response.id) {
        this.toast.success(res.response.message, 'User update:', {
          closeButton: true,
          timeOut: 2000,
        });
      }
    });
  }
}
