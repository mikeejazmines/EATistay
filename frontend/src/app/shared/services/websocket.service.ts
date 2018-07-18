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
     getMessage(): Observable<any> {
        return this.socket
            .fromEvent('message');
    }
}

