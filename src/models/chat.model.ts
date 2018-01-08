/**
 * Created by richard on 18-1-1.
 */
import { Message } from './message.model';
import { User } from './user.model';

export class Chat {   // 聊天数组
  sender: User = new User('', '', '');       // 发送方
  receiver: User = new User('', '', '');     // 接收方
  members: User[] = [];                      // 群聊
  group_chat_name: string;                   // 群名称
  contents: Message[] = [];  // 聊天内容
  new_message_number: number = 0;   // 新消息数量

  constructor() {}
}
