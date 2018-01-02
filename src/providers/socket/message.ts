/**
 * Created by richard on 17-7-10.
 */
export class Message {
  type: string;
  message: any;
  date: any;

  constructor(type, message, data) {
    this.type = type;
    this.message = message;
    this.date = data;
  }
}
