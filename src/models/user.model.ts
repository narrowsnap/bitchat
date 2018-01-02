/**
 * Created by richard on 18-1-1.
 */
export class User {   // 用户
  _id: string;             // 数据库id
  username: string;       // 用户名
  avatar: string;         // 头像
  contacts: any[] = [];       // 联系人

  constructor(_id, username, avatar) {
    this._id = _id;
    this.username = username;
    this.avatar = avatar;
  }
}
