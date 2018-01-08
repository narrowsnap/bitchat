import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { UserProvider } from '../../../providers/user/user';
import { HTTP_HOST } from '../../../providers/config';

/**
 * Generated class for the GroupChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-group-chat',
  templateUrl: 'group-chat.html',
})
export class GroupChatPage {
  url: string = HTTP_HOST;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private userProvider: UserProvider
  ) {
  }

  ionViewDidLoad() {
  }

  toAddGroupChat() {
    this.app.getRootNavs()[0].push('AddGroupChatPage');
  }

  toChatDetail(chat: any) {
    this.app.getRootNav().push('ChatDetailPage', {
      group_chat: true,
      chat: chat
    })
  }

}
