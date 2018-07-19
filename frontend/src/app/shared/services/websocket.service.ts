import { Injectable } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private socket: Socket) { }

    sendMessage(msg: string) {
        this.socket.emit('message', msg);
    }

    sendUserResponse(response: Object) {
      console.log(response);
      this.socket.emit('userResponse', response);
    }

     getMessage(): Observable<any> {
        return this.socket
            .fromEvent('message');
    }

    getResponse(): Observable<any> {
      return this.socket
          .fromEvent('userResponse');
  }
}

