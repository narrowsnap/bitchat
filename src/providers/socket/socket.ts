import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';
import { SOCKET_HOST } from '../config';
import { Message } from '../../models/message.model';
import { UserProvider } from '../user/user';

@Injectable()
export class SocketProvider {
  private socket: any = io(SOCKET_HOST);
  newMessage: Observable<any>;
  messages: any = [];
  receiver: string;
  username: string;
  socketObserver: any;

  constructor(
    public http: Http,
    private storage: Storage,
    private userProvider: UserProvider
  ) {
    this.newMessage = Observable.create(observer => {
      this.socketObserver = observer;
    });
    this.init();
  }

  init() {
    this.username = this.userProvider.getUser().username;
  }

  disconnect(username: string) {
    // this.socket.disconnect();
    this.socket.emit('end', username);
  }

  connect(username: string) {
    this.socket.connect();
  }

  sendMessage(message: Message) {
    this.socket.emit('send message', message);
  }

  receiveMessage() {
    // console.log('username: ' + username);
    let observable = new Observable(observer => {
      this.socket.on('receive message', (message) => {
        if(message.receiver == this.username) {
          observer.next(message);
        }
      });
    });
    return observable;
  }

  showInfo() {
    // console.log('username: ' + username);
    let observable = new Observable(observer => {
      this.socket.on('show info', (msg) => {
        console.log(typeof msg);
        // this.socket.emit('message reply', {sender: msg.sender, receiver: msg.receiver});
        observer.next(msg);
      });
    });
    return observable;
  }

  // 发送验证申请
  sendVerify(receiver: string) {
    this.socket.emit('send verify',receiver);
  }

  // 每次有好友申请后提示
  receiveVerify() {
    let observable = new Observable(observer => {
      this.socket.on('receive verify', (msg) => {
        if(msg == this.username) {
          observer.next(1)
        }
      });
    });
    return observable;
  }



}
