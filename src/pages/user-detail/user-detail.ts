import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user.model';
import { UserProvider } from '../../providers/user/user';
import { HTTP_HOST } from '../../providers/config';

/**
 * Generated class for the UserDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {
  user: User = new User('', '', '');  // 详细页面的user
  is_contacted: boolean;   // 是否是好友
  url: string = HTTP_HOST;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider
  ) {
    this.user = navParams.get('user');
    this.is_contacted = this.userProvider.isContacted(this.user.username);
    console.log('Hello UserDetailComponent Component');
  }

  addToContact() {
    this.navCtrl.push('VerificationPage', {
      receiver: this.user.username
    });
  }

  chat() {
    this.navCtrl.push('ChatDetailPage', {
      user: this.user
    })
  }
}
