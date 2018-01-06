import { Component, NgZone, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { SocketProvider } from "../../../providers/socket/socket";
import { UserProvider } from "../../../providers/user/user";
import { ChatProvider } from "../../../providers/chat/chat";
import { HTTP_HOST } from "../../../providers/config";
import { Message } from '../../../models/message.model';
import { Chat } from '../../../models/chat.model';
import { User } from '../../../models/user.model';

/**
 * Generated class for the ChatDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})
export class ChatDetailPage implements OnInit {
  @ViewChild('txtChat') txtChat: any;
  @ViewChild('screen') screen: any;
  url: string = HTTP_HOST;
  message: Message = new Message();
  content: string;
  user: User = new User('', '', '');
  chat_with: User = new User('', '', '');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _zone: NgZone,
    private socketProvider: SocketProvider,
    private userProvider: UserProvider,
    private chatProvider: ChatProvider,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.chat_with = this.navParams.get('user');
  }

  ngOnInit() {
    this.user = this.userProvider.getUser();
    // this.receiveMessage();
    this.chatsChanged();
  }

  ionViewWillEnter() {
    this.changeDetectorRef.detectChanges();
    this.scrollToBottom();
  }

  // 之后重写进 back 方法
  goBack() {
    // this.chatProvider.setChats(this.chat);
    this.chatProvider.clearMessagesNumber(this.chat_with.username);
    this.navCtrl.setRoot('TabsPage');
  }

  sendMessage() {
    if(this.content) {
      this.scrollToBottom();
      let message = new Message();
      message.sender = this.user.username;
      message.receiver = this.chat_with.username;
      message.content = this.content;
      message.create_time = Date.now();

      // 往chat数组里面push message
/*      if(!this.chat.sender.username) {
        this.chat.sender = this.user;
        this.chat.receiver = this.chat_with;
      }
      this.chat.contents.push(message);*/
      this.chatProvider.updateChats(message, true);
      this.changeDetectorRef.detectChanges();
      this.scrollToBottom();

      this.socketProvider.sendMessage(message);
      this.content = '';
    }

  }

/*  receiveMessage() {
    this.socketProvider.receiveMessage()
      .subscribe(
        () => {
          // 往chat数组里面push message
          this.changeDetectorRef.detectChanges();
          this.scrollToBottom();
        },
        err => {
          console.log(err);
        }
      )
  }*/

  scrollToBottom() {
    this._zone.run(() => {
      setTimeout(() => {
        this.screen.scrollToBottom(300);
      });
    });
  }

  by(name) {
    return function(o, p){
      let a, b;
      if (typeof o === "object" && typeof p === "object" && o && p) {
        a = o[name];
        b = p[name];
        if (a === b) {
          return 0;
        }
        if (typeof a === typeof b) {
          return a < b ? -1 : 1;
        }
        return typeof a < typeof b ? -1 : 1;
      }
      else {
        throw ("error");
      }
    }
  }

  test() {
    console.log('change');
  }

  chatsChanged() {
    this.socketProvider.chatsChanged()
      .subscribe(
        () => {
          // 往chat数组里面push message
          this.changeDetectorRef.detectChanges();
          this.scrollToBottom();
        },
        err => {
          console.log(err);
        }
      )
  }

}
