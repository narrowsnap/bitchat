/**
 * Created by richard on 17-7-10.
 */
import {Component} from '@angular/core';

@Component({
  selector: 'chat-bubble',
  inputs: ['msg: message'],
  template:
      `
    <div class="chatBubble">
      <img class="profile-pic {{msg.position}}" src="{{msg.img}}">
      <div class="chat-bubble {{msg.position}}">
        <div class="message">{{msg.message}}</div>
        <div class="message-detail">
          <span style="font-weight:bold;">{{msg.senderName}} </span>,
          <span>{{msg.time}}</span>
        </div>
      </div>
    </div>
  `
})
export class ChatBubble {
  constructor() {
/*    this.msg = {
      content :  'Am I dreaming?',
      position : 'left',
      time : '12/3/2016',
      senderName : 'Gregory'
    }*/
  }
}
