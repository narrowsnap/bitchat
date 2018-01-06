import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { User } from '../../models/user.model';
import { UserProvider } from '../../providers/user/user';
import { HTTP_HOST } from '../../providers/config';

/**
 * Generated class for the UserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  user: User = new User('', '', '');
  url: string = HTTP_HOST;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private userProvider: UserProvider
  ) {
  }

  ionViewDidLoad() {
    this.user = this.userProvider.getUser();
  }

  getUserInfo() {

  }

  setting() {
    // this.navCtrl.push(SettingComponent);
    this.app.getRootNav().push('SettingPage');
  }


}
