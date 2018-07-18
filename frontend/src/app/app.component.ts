import { Component, OnInit } from '@angular/core';

import { WebsocketService } from './shared/services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private socket: WebsocketService) {}

  title = 'EATistay';

  ngOnInit() {
    this.socket.sendMessage('test');
    this.socket.getMessage().subscribe((msg) => {
      console.log(msg);
    });
  }
}
