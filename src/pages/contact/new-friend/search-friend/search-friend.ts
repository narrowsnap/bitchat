import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { UserProvider } from '../../../../providers/user/user'
import { AlertProvider } from '../../../../providers/alert/alert'

/**
 * Generated class for the SearchFriendPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-friend',
  templateUrl: 'search-friend.html',
})
export class SearchFriendPage {

  searchInfo: string = '';
  username: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private userProvider: UserProvider,
    private alertProvider: AlertProvider,
    public loadingCtrl: LoadingController
  ) {
    console.log('Hello SearchFriendComponent Component');
    this.storage.get('userInfo')
      .then((userInfo) => {
        if(userInfo) {
          this.username = userInfo.username;
        }
      })
  }

  search() {
    if(this.searchInfo == this.username) {
      this.alertProvider.showAlert('', '亲，你输的是自己的名字哦！')
    } else {
      this.userProvider.searchUser(this.searchInfo)
        .subscribe(
          data => {
            if(data.status == 200) {
              this.presentLoading();
              setTimeout(() => {
                this.navCtrl.push('UserDetailPage', {
                  user: data.user
                })
              }, 1000);

            } else {
              console.log(data)
              this.alertProvider.showAlert('', data.message)
            }
          },
          err => {
            console.log(err)
          }
        )
    }


  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "正在查找联系人...",
      duration: 1000
    });
    loader.present();
  }

}
