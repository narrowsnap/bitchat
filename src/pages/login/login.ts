import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserProvider } from '../../providers/user/user';
import { VerifyProvider } from '../../providers/verify/verify';
import { AlertProvider } from '../../providers/alert/alert'

import { SocketProvider } from '../../providers/socket/socket';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string = '';
  password: string = '';
  info: string = '';

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private verifyProvider: VerifyProvider,
    public alertProvider: AlertProvider,
    private storage: Storage,
    private socketProvider: SocketProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login() {
    this.info = '';
    if(this.username == '' || this.password == ''){
      this.info = '请完善输入'
    } else {
      this.info = '';
      this.userProvider.login(this.username, this.password)
        .subscribe(
          data => {
            if(data.status == 200) {
              this.storage.set('hasSeenTutorial', 'true');
              this.loading();
              setTimeout(() => {
                this.userProvider.setUser(data.user);
                this.verifyProvider.updateVerify();
                this.socketProvider.connect(this.username);
                this.navCtrl.setRoot('TabsPage');
              }, 1000)

              // this.alertProvider.showAlert('成功',data.message)
            } else {
              this.alertProvider.showAlert('失败',data.message)
            }
          },
          err => {
            console.log(err)
          }
        )
    }
  }

  toRegister() {
    this.navCtrl.setRoot('RegisterPage');
  }

  addVerifyNumber(username: string) {
    this.userProvider.showVerifyNumber(username)
      .subscribe(
        data => {
          if(data.status == 200) {
            this.storage.set('verifyNumber', data.verifyNumber);
          }
        },
        err => {
          console.log(err);
        }
      )
  }

  loading() {
    let loading = this.loadingCtrl.create({
      content: '登录中,请稍后...',
      duration: 1000
    });
    loading.present();
  }

}
