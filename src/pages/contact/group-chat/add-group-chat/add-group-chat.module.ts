import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGroupChatPage } from './add-group-chat';

@NgModule({
  declarations: [
    AddGroupChatPage,
  ],
  imports: [
    IonicPageModule.forChild(AddGroupChatPage),
  ],
  exports: [
    AddGroupChatPage
  ]
})
export class AddGroupChatPageModule {}
