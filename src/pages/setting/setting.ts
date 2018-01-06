import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ChatProvider } from '../../providers/chat/chat';

/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private storage: Storage,
    private chatProvider: ChatProvider
  ) {
    console.log('Hello SettingComponent Component');
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: '确认退出',
      message: '退出后您将接收不到新消息通知，是否确认退出？',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.storage.clear();
            this.chatProvider.clear();
            this.navCtrl.setRoot('LoginPage');
          }
        },
        {
          text: '取消',
          handler: () => {
            console.log('cancel')
          }
        }
      ]
    });
    alert.present();

  }
}
