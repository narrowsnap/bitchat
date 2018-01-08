import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import simplePinYin from 'simple-pinyin';

import { UserProvider } from '../../providers/user/user';
import { AlertProvider } from '../../providers/alert/alert'
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  username: string = '';
  password: string = '';
  sure: string = '';
  info: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    public alertProvider: AlertProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    this.info = '';
    if(this.username == '' || this.password == '' || this.sure == ''){
      this.info = '请完善输入'
    } else {
      this.info = '';
      if(this.password == this.sure) {
        let pinyin = simplePinYin(this.username, {pinyinOnly: false})[0]
        // console.log('start')
        this.userProvider.register(this.username, this.password, pinyin)
          .subscribe(
            data => {
              if(data.status == 200) {
                this.alertProvider.showAlert('注册成功','请登录')
                this.navCtrl.setRoot('LoginPage');
              } else {
                this.alertProvider.showAlert('失败',data.message)
              }
            },
            err => {
              console.log(err)
            }
          )
      } else {
        this.info = '两次密码不相同'
      }
    }
  }

  toLogin() {
    this.navCtrl.setRoot('LoginPage');
  }

}
