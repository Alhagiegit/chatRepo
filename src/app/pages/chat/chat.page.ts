import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Chat, Message } from 'src/app/model/chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chat: Chat;
  id: string;
  public postForm: FormGroup;
  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public modalCtrl: ModalController,
    private toastCtrl:ToastController
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.createForm();
  }
  createForm(): void {
    this.postForm = this.fb.group({
      message: ['', Validators.required],
    });
  }

  async ngOnInit() {
    console.log('id', this.id);
    this.chat = await this.chatService.getChat(this.id);
  }

  async errorToast(error: string, color?: string) {
    const toast = await this.toastCtrl.create({
      color: (color = 'danger'),
      message: error,
      duration: 3000,
      icon: 'warning',
      animated: true,
    });
    toast.present();
  }

  send = async () => {
    try {
      const mm = await this.chatService.sendMessage(
        this.postForm.value.message,
        this.id
      );
      this.postForm.reset()
      console.log(this.chat.messages);
      // this.chat = {...this.chat, messages: [...this.chat.messages, mm]}
      this.chat = await this.chatService.getChat(this.id);
    } catch (e) {
      this.errorToast(e.error.message);
    }
  };
}
