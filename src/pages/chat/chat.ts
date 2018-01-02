import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { SocketProvider } from '../../providers/socket/socket';
import { ChatProvider } from '../../providers/chat/chat';

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage implements OnInit {
  chatArray: any = [];
  msgNumber = [];
  newNumber: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    private storage: Storage,
    private socketProvider: SocketProvider,
    private chatProvider: ChatProvider,
    private changeDetectorRef: ChangeDetectorRef
  ) {

/*    this.socketProvider.updateMsg()
      .subscribe(
        message => {
          // message
          console.log(message)
          this.storage.get(message[0].sender)
            .then((savedMsg) => {
              if(!savedMsg) {
                let savedMsg = [];
                for(let i in message) {
                  savedMsg.push({
                    type: 'res',
                    message: message[i].message,
                    date: message[i].date
                  })
                }
                console.log(savedMsg);
                this.storage.set(message[0].sender, savedMsg);
              } else {
                for(let i in message) {
                  savedMsg.push({
                    type: 'res',
                    message: message[i].message,
                    date: message[i].date
                  })
                }
                console.log(savedMsg);
                this.storage.set(message[0].sender, savedMsg);
              }
            });

          // chatArray
          let length = 0;
          for(let i in message) {
            length++;
            console.log(i);
          };
          this.storage.get('chatArray')
            .then((chatArray) => {
              if(!chatArray) {
                let chatArray = {};
                chatArray[message[length-1].sender] = {
                  img: message[length-1].img,
                  message: message[length-1].message,
                  date: message[length-1].date
                };
                this.storage.set('chatArray', chatArray);
              } else {
                if(chatArray[message[length-1].sender] != undefined) {
                  chatArray[message[length-1].sender].message = message[length-1].message;
                  this.storage.set('chatArray', chatArray);
                } else {
                  chatArray[message[length-1].sender].img = message[length-1].img;
                  chatArray[message[length-1].sender].message = message[length-1].message;
                  chatArray[message[length-1].sender].date = message[length-1].date;
                  this.storage.set('chatArray', chatArray);
                }
              }
            });

          if(this.msgNumber[message[0].sender] != undefined) {
            this.msgNumber[message[0].sender] += length;
          } else {
            this.msgNumber[message[0].sender] = length;
          }

          this.ionViewWillEnter();
          this.changeDetectorRef.detectChanges();
        },
        err => {
          console.log(err);
        }
      );*/


    // this.receiveMessage();
  }

  ionViewWillEnter(){
    // console.log('chat refresh');
    this.storage.get('chatArray')
      .then((chatArray) => {
        if(chatArray) {
          this.chatArray = [];
          for(let key in chatArray) {
            this.chatArray.push(
              {
                chat_with: key,
                img: chatArray[key].img,
                message: chatArray[key].message,
                date: chatArray[key].date
              }
            )
          }
          // console.log(this.chatArray);
          this.chatArray.sort(this.by('date'));
          // console.log(this.chatArray)
          // this.chatArray.reverse();
          // this.chatArray = chatArray;
        } else {
          console.log('have not')
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  async ngOnInit() {
    let a = await this.storage.get('ss');
    if(a) {
      console.log(a);
    } else {
      console.log('no')
    }
  }


  toChatDetail(nickname: string, img: string) {
    this.app.getRootNav().push('ChatDetailPage', {
      user: {
        nickname: nickname,
        img: img
      }
    })
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
        if (a === b) {
          return a > b ? -1 : 1;
        }
        return a > b ? -1 : 1;
      }
      else {
        throw ("error");
      }
    }
  }

  // 监听消息
/*  receiveMessage() {
    this.socketProvider.receiveMessage()
      .subscribe(
        data => {
          this.storage.get(msg.receiver)
            .then((messages) => {
              if(messages) {

              }
            })
        },
        err => {
          console.log(err);
        }
      )
  }*/
/*  listeningMsg() {
    this.socketProvider.showInfo()
      .subscribe(
        data => {
            console.log(data);
            // this.newNumber = data;
            this.changeMsg(data);
          // this.ionViewWillEnter();
        },
        err => {
          console.log(err);
        }
      )
  }*/

  changeMsg(data) {
    this.storage.get(data.sender)
       .then((savedMsg) => {
        if(!savedMsg) {
          let savedMsg = [];
          savedMsg.push({
            type: 'res',
            message: data.message,
            date: data.date
          });
          console.log(savedMsg);
          this.storage.set(data.sender, savedMsg);
          this.ionViewWillEnter();
        } else {
          savedMsg.push({
            type: 'res',
            message: data.message,
            date: data.date
          });
          console.log(savedMsg);
          this.storage.set(data.sender, savedMsg);
          this.ionViewWillEnter();
          }
        });

       // chatArray
       this.storage.get('chatArray')
        .then((chatArray) => {
          if(!chatArray) {
            let chatArray = {};
              chatArray[data.sender] = {
              img: data.img,
              message: data.message,
              date: data.date
            };
          this.storage.set('chatArray', chatArray);
            this.ionViewWillEnter();
          } else {
              if(chatArray[data.sender] != undefined) {
              chatArray[data.sender].message = data.message;
              this.storage.set('chatArray', chatArray);
              this.ionViewWillEnter();
          } else {
              chatArray[data.sender].img = data.img;
              chatArray[data.sender].message = data.message;
              chatArray[data.sender].date = data.date;
              this.storage.set('chatArray', chatArray);
              this.ionViewWillEnter();
            }
          }
          });
        if(this.msgNumber[data.sender] != undefined) {
          this.msgNumber[data.sender] += 1;
        } else {
          this.msgNumber[data.sender] = 1;
        }
        this.changeDetectorRef.detectChanges();
  }

  messagesNumberPipe(messagesNumber) {
    return (messagesNumber == 0) ? null : messagesNumber;
  }

}
