import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateChatPageRoutingModule } from './create-chat-routing.module';

import { CreateChatPage } from './create-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateChatPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateChatPage]
})
export class CreateChatPageModule {}
