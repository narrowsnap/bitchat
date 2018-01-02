import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { User } from '../../../models/user.model';
import { Verify } from '../../../models/verify.model';
import { UserProvider } from '../../../providers/user/user';
import { VerifyProvider } from '../../../providers/verify/verify';
import { AlertProvider } from '../../../providers/alert/alert';

/**
 * Generated class for the AddFriendPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-friend',
  templateUrl: 'new-friend.html',
})
export class NewFriendPage {
  user: User = new User('', '', '');
  verifies: Verify[] = [];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private verifyProvider: VerifyProvider,
    private alertProvider: AlertProvider,
  ) {
  }


  ionViewDidLoad() {
    this.initInfo();
  }

  initInfo() {
    this.user = this.userProvider.getUser();
    this.verifies = this.verifyProvider.getVerifies();
  }

  start() {
    this.navCtrl.push('SearchFriendPage');
  }

  // 同意申请
  agreeVerify(verify_id: string) {
    this.verifyProvider.agreeVerify(verify_id)
      .subscribe(
        () => {
          // 更新用户信息
          this.userProvider.updateUser();
          // 更新申请信息
          this.verifyProvider.updateVerify().then(
            () => {
              this.initInfo();
            }
          );
          this.presentLoading();
        },
        err => {
          console.log(err);
          this.alertProvider.showAlert('发送失败',err)
        }
      )
  }

  // 拒绝申请
  disagreeVerify(verifyId: string) {
    this.verifyProvider.disagreeVerify(verifyId)
      .subscribe(
        data => {
          this.alertProvider.showToast(data.message);
          // 更新申请信息
          this.verifyProvider.updateVerify().then(
            () => {
              this.initInfo();
            }
          );
        },
        err => {
          console.log(err);
          this.alertProvider.showAlert('发送失败',err)
        }
      )
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "正在添加联系人...",
      duration: 2000
    });
    loader.present();
  }

}
