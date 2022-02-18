import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Chat } from 'src/app/model/chat';
import { ChatService } from 'src/app/services/chat.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.page.html',
  styleUrls: ['./create-chat.page.scss'],
})
export class CreateChatPage implements OnInit {
  chat: Chat;
  public postForm: FormGroup;
  constructor(
    private toastCtr: ToastController,
    private modalCtr: ModalController,
    private fb: FormBuilder,
    public modalCtrl: ModalController,
    private postService: ChatService,
    private storage: Storage,
    private router: Router
  ) {}

  createForm(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.createForm();
  }

  async successToast(success: string, color?: string) {
    const toast = await this.toastCtr.create({
      color: color='success',
      message: success,
      duration: 2000,
      icon: 'checkmark-done',
    });
    toast.present();
  }
  async errorToast(error: string, color?: string) {
    const toast = await this.toastCtr.create({
      color: color='danger',
      message: error,
      duration: 3000,
      icon: 'warning',
      animated: true,
    });
    toast.present();
  }

  createChat = async () => {
    try {
      if (this.postForm.value.title && this.postForm.value.imageUrl.length > 30) {
        await this.postService.createChat(
          this.postForm.value.title,
          this.postForm.value.imageUrl
        );
        this.successToast('Chat created successfully', 'success');
        await this.modalCtr.dismiss(this.postForm.value);
      } else {
        this.errorToast('Invalid Url image', 'danger');
      }
    } catch (e) {
      this.errorToast(e.error.message);
    }
  };

  dismissModal = () => {
    this.modalCtr.dismiss();
  };
}
