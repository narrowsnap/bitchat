import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { ChatProvider } from '../../providers/chat/chat';
import { HTTP_HOST } from '../../providers/config';

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage implements OnInit {
  chatArray: any = [];
  msgNumber = [];
  url: string = HTTP_HOST;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    private chatProvider: ChatProvider,
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ionViewWillEnter(){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  async ngOnInit() {
    // let a = await this.storage.get('ss');
    // if(a) {
    //   console.log(a);
    // } else {
    //   console.log('no')
    // }
  }


  toChatDetail(receiver) {
    this.app.getRootNav().push('ChatDetailPage', {
      user: receiver
    })
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
        if (a === b) {
          return a > b ? -1 : 1;
        }
        return a > b ? -1 : 1;
      }
      else {
        throw ("error");
      }
    }
  }

  messagesNumberPipe(messagesNumber) {
    return (messagesNumber == 0) ? null : messagesNumber;
  }

}
