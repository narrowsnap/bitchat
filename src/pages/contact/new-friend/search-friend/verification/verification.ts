import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import simplePinYin from 'simple-pinyin';

import { Verify } from '../../../../../models/verify.model';
import { UserProvider } from '../../../../../providers/user/user';
import { VerifyProvider } from '../../../../../providers/verify/verify';
import { AlertProvider } from '../../../../../providers/alert/alert'
import { SocketProvider } from '../../../../../providers/socket/socket';
import {createVerify} from "crypto";

/**
 * Generated class for the VerificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {
  verify: Verify = new Verify();
  senderId: string;
  sender: any;
  receiver: string;
  img: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private verifyProvider: VerifyProvider,
    private alertProvider: AlertProvider,
    private socketProvider: SocketProvider
  ) {
  }

  ionViewWillEnter() {
    this.verify.receiver = this.navParams.get('receiver');

    this.verify.sender_id = this.userProvider.getUser()._id;
    this.verify.sender = this.userProvider.getUser().username;
    this.verify.sender_avatar = this.userProvider.getUser().avatar;
    this.verify.verify_msg = '我是' + this.userProvider.getUser().username;

    this.socketProvider.connect(this.receiver);
  }


  sendVerify() {
    console.log(this.verify);
    this.verify.sender_pinyin = simplePinYin(this.verify.sender, {pinyinOnly: false})[0];
    this.verify.receiver_pinyin = simplePinYin(this.verify.receiver, {pinyinOnly: false})[0];
    this.verifyProvider.sendVerify(this.verify)
      .subscribe(
        data => {
          if(data.status == 200) {
            this.socketProvider.sendVerify(this.receiver);
            this.alertProvider.showToast(data.message);
          } else {
            this.alertProvider.showAlert(' ',data.message)
          }
          this.navCtrl.pop();
        },
        err => {
          this.alertProvider.showAlert('发送失败',err)
        }
      )
  }
}
