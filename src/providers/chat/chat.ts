import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { Message } from '../../models/message.model';
import { Chat } from '../../models/chat.model';
import { SocketProvider } from '../socket/socket';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {
  chats: Chat[] = [];

  constructor(
    public http: Http,
    private storage: Storage,
    private socketProvider: SocketProvider
  ) {
  }

  ngOnInit() {
    this.receiveMessage();
  }

  init() {
    this.storage.get('chats')
      .then(chats => {
        if(chats) {
          this.chats = chats;
        }
      })
  }

  // 获取聊天列表
  getChats() {
    return this.chats;
  }

  setChats(chat) {
    for(let i in this.chats) {
      if(this.chats[i].sender.username == chat.sender.username) {
        this.chats[i] = chat;
        break;
      }
    }
    this.storage.set('chats', this.chats);
  }

  // 获取单个聊天记录
  getChatByReceiver(receiver: string) {
    for(let chat of this.chats) {
      if(chat.receiver.username == receiver) {
        return chat;
      }
    }
  }

  // 监听消息
  receiveMessage() {
    this.socketProvider.receiveMessage()
      .subscribe(
        data => {
          const message: any = data;
          for(let chat of this.chats) {
            if(chat.receiver.username == message.sender) {
              chat.new_message_number++;
              break;
            }
          }
        },
        err => {
          console.log(err);
        }
      )
  }

}
