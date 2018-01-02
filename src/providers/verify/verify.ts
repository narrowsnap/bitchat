import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage'

import { HTTP_HOST } from '../config';
import { Verify } from '../../models/verify.model';
import { UserProvider } from '../user/user';

/*
  Generated class for the VerifyProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class VerifyProvider {
  url: string = HTTP_HOST + '/verify/';
  verifies: Verify[] = [];

  constructor(
    public http: Http,
    private storage: Storage,
    private userProvider: UserProvider
  ) {
    console.log('Hello VerifyProvider Provider');
  }

  init() {
    this.storage.get('verifies')
      .then(verifies => {
        if(verifies) {
          this.verifies = verifies;
        }
      })
  }

  getVerifies() {
    return this.verifies;
  }

  getVerifiesNumber() {
    return this.verifies.length;
  }

  // 发送验证申请
  sendVerify(verify: any) {
    return this.http.post(this.url + 'sendVerify', verify)
      .map(res => res.json())
  }

  // 更新验证信息
  updateVerify() {
    const username = this.userProvider.getUser().username;
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'updateVerify', {username: username})
        .map(res => res.json())
        .subscribe(
          data => {
            this.verifies = data.verifies;
            this.storage.set('verifies', data.verifies);
            resolve(this.getVerifiesNumber());
          },
          err => {
            console.log(err);
            reject(err);
          }
        )
    })
  }

  // 同意申请
  agreeVerify(verify_id: string) {
    return this.http.post(this.url + 'agreeVerify', {verify_id: verify_id})
      .map(res => res.json())
  }

  // 拒绝申请
  disagreeVerify(verifyId: string) {
    return this.http.post(this.url + 'disagreeVerify',
      {
        verifyId: verifyId,
      })
      .map(res => res.json())
  }

}
