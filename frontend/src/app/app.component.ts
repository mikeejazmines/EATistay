import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { WebsocketService } from './shared/services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private socket: WebsocketService, private toastr: ToastrService) {}

  title = 'EATistay';

  ngOnInit() {
  }
}
