import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { User } from '../../models/user.model';
import { HTTP_HOST } from '../config';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {
  url: string = HTTP_HOST + '/users/';
  user: User = new User('', '', '');
  groupedContacts: any = [];

  constructor(
    public http: Http,
    private storage: Storage,
  ) {

  }

  init() {
    this.storage.get('user')
      .then(user => {
        if(user) {
          this.user = user;
          this.groupContacts(user.contacts);
        }
      })
  }

  // 设置用户信息
  setUser(user) {
    this.user = user;
    this.groupContacts(user.contacts);
    this.storage.set('user', user).then()
  }

  // 获取用户信息
  getUser() {
    return this.user;
  }

  // 返回联系人信息
  getGroupContacts() {
    return this.groupedContacts;
  }

  // 更新用户信息
  updateUser() {
    console.log(this.user._id);
    this.http.post(this.url + 'updateUser', {user_id: this.user._id})
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          this.setUser(data);
          this.groupContacts(data.contacts);
        },
        err => {
          console.log(err);
        }
      )
  }

  // 用户注册
  register(username: string, password: string) {
    return this.http.post(this.url + 'register',
      {username: username, password: password})
      .map(res => res.json())
  }

  //用户登录
  login(username: string, password: string) {
    return this.http.post(this.url + 'login',
      {username: username, password: password})
      .map(res => res.json())
  }

  // 搜索用户
  searchUser(username: string) {
    return this.http.post(this.url + 'search',
      {username: username})
      .map(res => res.json())
  }


  // 显示申请数量
  showVerifyNumber(receiver: string) {
    return this.http.post(this.url + 'showVerifyNumber',
      {
        receiver: receiver,
      })
      .map(res => res.json())
  }

  // 显示申请信息
  getVerify(receiver: string) {
    return this.http.post(this.url + 'getVerify',
      {
        receiver: receiver,
      })
      .map(res => res.json())
  }

  by(name) {
    return function(o, p){
      let a, b;
      if (typeof o === "object" && typeof p === "object" && o && p) {
        a = o[name];
        b = p[name];
        if (a === b) {
          return 0;
        }
        if (typeof a === typeof b) {
          return a < b ? -1 : 1;
        }
        return typeof a < typeof b ? -1 : 1;
      }
      else {
        throw ("error");
      }
    }
  }

  groupContacts(contacts) {
    this.groupedContacts = [];

    let sortedContacts = contacts.sort(this.by('pinyin'));
    let currentLetter = false;
    let currentContacts = [];

    for(let contact of sortedContacts) {
      if(contact.pinyin.charAt(0).toUpperCase() != currentLetter) {
        currentLetter = contact.pinyin.charAt(0).toUpperCase();

        let newGroup = {
          letter: currentLetter,
          contacts: []
        };

        currentContacts = newGroup.contacts;
        this.groupedContacts.push(newGroup);

      }
      currentContacts.push(contact);
    }
  }

  // 是否是好友
  isContacted(username: string) {
    for(let contact of this.user.contacts) {
      if(contact.username == username) {
        return true;
      }
    }
    return false;
  }

  getUserContact(username: string) {
    for(let contact of this.user.contacts) {
      if(username == contact.username) {
        return new User(contact._id, contact.username, contact.avatar);
      }
    }
  }

}
