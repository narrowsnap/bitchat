import { Component, NgZone, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, Navbar } from 'ionic-angular';

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
  @ViewChild(Navbar) navBar: Navbar;
  url: string = HTTP_HOST;
  message: Message = new Message();
  content: string;
  user: User = new User('', '', '');
  chat_with: User = new User('', '', '');
  is_group_chat: boolean = false;
  group_chat: any;
  is_chatbot: boolean = false;
  chatbot_message = [];
  wait_info: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _zone: NgZone,
    private socketProvider: SocketProvider,
    private userProvider: UserProvider,
    private chatProvider: ChatProvider,
    private changeDetectorRef: ChangeDetectorRef,
    private alertCtrl: AlertController,
  ) {
    if(this.navParams.get('group_chat')) {
      this.group_chat = this.navParams.get('chat');
      this.is_group_chat = true;
    } else {
      this.chat_with = this.navParams.get('user');
      if(this.chat_with.username == 'chatbot') {
        this.is_chatbot = true;
      }
    }
  }

  ngOnInit() {
    this.user = this.userProvider.getUser();
    // this.receiveMessage();
    this.chatsChanged();
    this.receiveMessage();
  }

  ionViewWillEnter() {
    // this.changeDetectorRef.detectChanges();
    this.scrollToBottom();
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e:UIEvent)=>{
      // todo something
      this.chatProvider.clearMessagesNumber(this.chat_with.username);
      this.navCtrl.setRoot('TabsPage');
    }
  }

  // 之后重写进 back 方法
  goBack() {
    // this.chatProvider.setChats(this.chat);
    this.chatProvider.clearMessagesNumber(this.chat_with.username);
    this.navCtrl.setRoot('TabsPage');
  }

  sendMessage() {
    if(this.is_chatbot) {
      if(this.content) {
        if(!this.wait_info) {
          const message = new Message();
          message.sender = this.user.username;
          message.receiver = this.chat_with.username;
          message.sender_avatar = this.user.avatar;
          message.content = this.content;
          this.chatbot_message.push(message);
          this.scrollToBottom();

          this.socketProvider.sendMessage(message);
          this.content = '';
          this.chatbot_message.push({
            sender: this.chat_with.username,
            receiver: this.user.username,
            content: '努力计算中，请稍等......'
          })
          this.wait_info = true;
        } else {
          this.showAlert('上一个回答还在计算中，等计算完了再输入(有时间优化)')
        }
      }
    } else {
      if(this.content) {
        this.scrollToBottom();
        let message = new Message();
        message.sender = this.user.username;
        if(this.is_group_chat) {
          for(let member of this.group_chat.members) {
            if(member.username != this.user.username) {
              message.members.push(member.username);
            }
          }
        } else {
          message.receiver = this.chat_with.username;
        }
        message.sender_avatar = this.user.avatar;
        message.content = this.content;
        message.create_time = Date.now();

        // 往chat数组里面push message
        /*      if(!this.chat.sender.username) {
         this.chat.sender = this.user;
         this.chat.receiver = this.chat_with;
         }
         this.chat.contents.push(message);*/
        this.chatProvider.updateChats(message, true);
        // this.changeDetectorRef.detectChanges();
        this.scrollToBottom();

        this.socketProvider.sendMessage(message);
        this.content = '';
      }
    }


  }

  receiveMessage() {
    this.socketProvider.receiveChatbotMessage()
      .subscribe(
        data => {
          this.chatbot_message.pop();
          // 往chat数组里面push message
          console.log('receive chatbot')
          this.chatbot_message.push(data);
          this.wait_info = false;
        },
        err => {
          console.log(err);
        }
      )
  }

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
          // this.changeDetectorRef.detectChanges();
          this.scrollToBottom();
        },
        err => {
          console.log(err);
        }
      )
  }

  input() {
    this.scrollToBottom();
  }

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      message: message,
    });
    alert.present();
  }

}
