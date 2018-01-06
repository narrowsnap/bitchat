import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SocketProvider } from '../providers/socket/socket';
import { UserProvider } from '../providers/user/user';
import { VerifyProvider } from '../providers/verify/verify';
import { ChatProvider } from '../providers/chat/chat';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
    private socketProvider: SocketProvider,
    private userProvider: UserProvider,
    private verifyProvider: VerifyProvider,
    private chatProvider: ChatProvider,
  ) {
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if(!hasSeenTutorial) {
          this.rootPage = 'TutorialPage';
        } else {
          this.userProvider.init();
          this.verifyProvider.init();
          this.chatProvider.init();
          this.rootPage = 'TabsPage';
        }
        this.platformReady();
        this.socketStart();
      });
  }


  platformReady() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.registerBackButtonAction();
    });
  }

/*
  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      this.storage.get('userInfo')
        .then((userInfo) => {
          if(userInfo) {
            this.socketProvider.disconnect(userInfo.username);
          }
          this.platform.exitApp();
        })
    })
  }
*/

  socketStart() {
    this.storage.get('userInfo')
      .then((userInfo) => {
        if(userInfo) {
          this.socketProvider.connect(userInfo.username);
        }
      })
  }

}
