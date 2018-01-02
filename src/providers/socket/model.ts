/**
 * Created by richard on 17-7-10.
 */
export class MessageType {
  public static readonly MSG_REQ: string = "message_request";
  public static readonly MSG_RES: string = "message_response"
}

export interface ChatMessage {
  type: MessageType;
  from: string;
  message: any;
  epoch?:number;
}
