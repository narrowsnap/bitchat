import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular'

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AlertProvider {

  constructor(
    public alertCtrl: AlertController,
    public toasrCtrl: ToastController
  ) {
  }

  showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['确认']
    });
    alert.present();
  }

  showToast(message: string) {
    let toast = this.toasrCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }


}
