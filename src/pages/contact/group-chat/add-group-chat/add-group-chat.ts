import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../../../providers/user/user';
import { HTTP_HOST } from '../../../../providers/config';

/**
 * Generated class for the AddGroupChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-group-chat',
  templateUrl: 'add-group-chat.html',
})
export class AddGroupChatPage {
  url: string = HTTP_HOST;
  users = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider
  ) {
  }

  ionViewDidLoad() {
    for(let group of this.userProvider.getGroupContacts()) {
      let user = {
        group: group,
        selected: false
      };
      this.users.push(user);
    }
    console.log('ionViewDidLoad AddGroupChatPage');
  }

  toggle(index) {
    this.users[index].selected = !this.users[index].selected;
  }

}
