import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserProvider } from '../../providers/user/user'
import { VerifyProvider } from '../../providers/verify/verify'
import { SocketProvider } from '../../providers/socket/socket'
import { ChatProvider } from '../../providers/chat/chat'

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage implements OnInit {
  chatView: any = 'ChatPage';
  contactView: any = 'ContactPage';
  userView: any = 'UserPage';
  mySelectedIndex: number;
  verifyNumber: number = null;
  msgNumber: number = null;
  username: string;

  constructor(
    public navParams: NavParams,
    private storage: Storage,
    private userProvider: UserProvider,
    private verifyProvider: VerifyProvider,
    private socketProvider: SocketProvider,
    private chatProvider: ChatProvider,
  ) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
    // this.getVerifyNumber();
  }

  ngOnInit() {
    this.username = this.userProvider.getUser().username;
    this.receiveVerify();
    this.receiveNotice();
    this.receiveMessage();
    this.updateInfo();
  }

  ionViewWillEnter() {
    // console.log('number: ' + this.verifyNumber);
  }

  ionViewDidLoad() {
    this.storage.get('verifyNumber')
      .then((verifyNumber) => {
        if(verifyNumber != null) {
          if(verifyNumber == 0) {
            this.verifyNumber = null;
          } else {
            this.verifyNumber = verifyNumber;
          }
        } else {
          console.log('no verify number');
          // setTimeout(this.ionViewDidLoad(), 500);
        }

      });
    console.log('ionViewDidLoad TabsPage');
  }

  // 加载 好友申请 信息
  async updateVerifyNumber() {
    await this.verifyProvider.updateVerify();
  }

  //  监听好友申请
  receiveVerify() {
    this.socketProvider.receiveVerify()
      .subscribe(
        () => {
          this.updateVerifyNumber();
        },
        err => {
          console.log(err);
        }
      )
  }

  verifiesNumberPipe(verifiesNumber) {
    return (verifiesNumber == 0) ? null : verifiesNumber;
  }

  receiveNotice() {
    this.socketProvider.receiveNotice()
      .subscribe(
        data => {
          console.log(data);
          this.userProvider.updateUser();
        },
        err => {
          console.log(err);
        }
      )
  }

  receiveMessage() {
    this.socketProvider.receiveMessage()
      .subscribe(
        message => {
          // 往chat数组里面push message
          console.log(message);
          this.chatProvider.updateChats(message, false);
        },
        err => {
          console.log(err);
        }
      )
  }

  updateInfo() {
    this.socketProvider.updateInfo()
      .subscribe(
        () => {
          this.userProvider.updateUser();
        },
        err => {
          console.log(err);
        }
      )
  }

}
