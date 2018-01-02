import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { User } from '../../models/user.model';
import { UserProvider } from '../../providers/user/user';
import { VerifyProvider } from '../../providers/verify/verify';
/**
 * Generated class for the ContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage{
  contacts: any;

  groupedContacts: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    private userProvider: UserProvider,
    private verifyProvider: VerifyProvider,
  ) {
  }

  ionViewWillEnter() {
  }

  ionViewDidLoad() {

  }

  addFriend() {
    this.app.getRootNavs()[0].push('NewFriendPage');
  }

  toUserDetail(contact: any) {
    const user = new User(contact._id, contact.username, contact.avatar);
    this.app.getRootNav().push('UserDetailPage', {
      user: user
    });
  }

  verifiesNumberPipe(verifiesNumber) {
    return (verifiesNumber == 0) ? null : verifiesNumber;
  }

}