import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Storage } from '@ionic/storage';

import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { Chat } from '../../models/chat.model';
import { UserProvider } from '../user/user';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {
  chats: Chat[] = [];
  status: boolean = false;

  constructor(
    public http: Http,
    private storage: Storage,
    private userProvider: UserProvider
  ) {
  }

  ngOnInit() {
    // this.receiveMessage();
  }

  init() {
    this.storage.get('chats')
      .then(chats => {
        if(chats) {
          this.chats = chats;
          console.log(this.chats);
        }
      })
  }

  // 获取聊天列表
  getChats() {
    let chats = [];
    for(let chat of this.chats) {
      if(chat.contents.length != 0) {
        chats.push(chat);
      }
    }
    return chats;
  }

  setChats(chat) {
    console.log(chat);
    console.log(this.chats);
    for(let i in this.chats) {
      if(this.chats[i].sender.username == chat.sender.username) {
        this.chats[i] = chat;
        this.storage.set('chats', this.chats);
        console.log(this.chats);
        break;
      }
    }
  }

  // 获取单个聊天记录
  getChatByReceiver(sender: User, receiver: User) {
    for(let chat of this.chats) {
      if(chat.receiver.username == receiver.username) {
        return chat;
      }
    }
    let chat = new Chat();
    chat.sender = sender;
    chat.receiver = receiver;
    this.chats.push(chat);
    console.log(this.chats);
    return chat;
  }


  clear() {
    this.chats = [];
  }

  updateChats(message: any, local: boolean) {
    for(let i in this.chats) {
      if(local) {
        if(message.receiver == this.chats[i].receiver.username) {
          this.chats[i].contents.push(message);
        }
      } else {
        if(message.sender == this.chats[i].receiver.username) {
          this.chats[i].contents.push(message);
          this.chats[i].new_message_number++;
        }
      }
      this.storage.set('chats', this.chats);
      return;
    }

    let sender = this.userProvider.getUser();
    let receiver = this.userProvider.getUserContact(message.sender);
    let chat = new Chat();
    chat.sender = sender;
    chat.receiver = receiver;
    chat.contents.push(message);
    chat.new_message_number = 1;
    this.chats.push(chat);
    this.storage.set('chats', this.chats);
  }

  clearMessagesNumber(username: string) {
    for(let i in this.chats) {
      if(this.chats[i].receiver.username == username) {
        this.chats[i].new_message_number = 0;
        this.storage.set('chats', this.chats);
        return;
      }
    }
  }


}
