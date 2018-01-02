/**
 * Created by richard on 18-1-1.
 */
export class Verify {   // 验证消息
  _id: string;            // 数据库id
  sender_id: string;       // 发送方id
  sender: string;         // 发送方
  receiver: string;       // 接收方
  verify_msg: any;         // 验证消息内容
  sender_avatar: string;            // 发送方头像
  sender_pinyin: string;   // 发送方首字母
  receiver_pinyin: string; // 接收方首字母
  status: number;         // 验证状态

  constructor() {}
}
