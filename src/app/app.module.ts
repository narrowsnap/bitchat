import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { AlertProvider } from '../providers/alert/alert';
import { StorageProvider } from '../providers/storage/storage';
import { SocketProvider } from '../providers/socket/socket';
import { ChatBubble } from '../components/chat-bubble/chat-bubble';
import { VerifyProvider } from '../providers/verify/verify';
import { ChatProvider } from '../providers/chat/chat';

@NgModule({
  declarations: [
    MyApp,
    ChatBubble
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatBubble
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    AlertProvider,
    StorageProvider,
    SocketProvider,
    VerifyProvider,
    ChatProvider
  ]
})
export class AppModule {}
