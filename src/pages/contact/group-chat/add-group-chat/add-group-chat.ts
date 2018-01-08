import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../../../providers/user/user';
import { SocketProvider } from '../../../../providers/socket/socket';
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
  groups = [];
  selected: boolean[][] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private socketProvider: SocketProvider,
  ) {
  }

  ionViewDidLoad() {
    this.selected[0] = [];
    this.selected.push([]);
    this.groups = this.userProvider.getGroupContacts();
    for(let i in this.groups) {
      for(let j in this.groups[i].contacts) {
        this.selected[i][j] = false;
      }
    }
    console.log(this.selected);
    console.log('ionViewDidLoad AddGroupChatPage');
  }

  toggle(i, j) {
    this.selected[i][j] = !this.selected[i][j];
  }

  canClick() {
    for(let i in this.selected){
      for(let j in this.selected[i]) {
        if(this.selected[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  submit() {
    let group_members = [];
    let members_name = [];
    for(let i in this.selected) {
      for(let j in this.selected[i]) {
        if(this.selected[i][j]) {
          group_members.push(this.groups[i].contacts[j]);
          members_name.push(this.groups[i].contacts[j].username);
        }
      }
    }
    this.userProvider.addGroupChat(group_members)
      .subscribe(
        data => {
          console.log(data);
          this.socketProvider.groupChatSocket(members_name)
        },
        err => {
          console.log(err)
        }
      )
  }

}
