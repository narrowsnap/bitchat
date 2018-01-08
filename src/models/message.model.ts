/**
 * Created by richard on 17-7-9.
 */
export class Message {   // 存储消息
  sender: string;       // 发送方
  receiver: string;     // 接收方
  sender_avatar: string;       // 发送方头像
  members: string[] = []; // 群聊接收方
  content: string;  // 聊天内容
  create_time: any;

  constructor() {}
}

