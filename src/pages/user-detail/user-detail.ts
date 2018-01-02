import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user.model';

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
  user: User = new User('', '', '');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.user = navParams.get('user');
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
