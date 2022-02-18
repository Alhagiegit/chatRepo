import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FeedsService } from 'src/app/services/feeds.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  nickname: string = '';
  password: string = '';

  public postForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public modalCtrl: ModalController,
    private loginService: FeedsService,
    private storage: Storage,
    private router: Router,
    private toastCtr: ToastController
  ) {}

  createForm(): void {
    this.postForm = this.fb.group({
      nickname: ['', Validators.required],
      password: ['', Validators.required],
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
      icon: 'lock-open',
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

  signin = async () => {
    try {
      const res = await this.loginService.login(
        this.postForm.value.nickname,
        this.postForm.value.password
      );
     await  this.storage.set('auth', res.accessToken);
      await this.successToast('logged in successfully', 'success')
      await this.router.navigate(['/feeds']);

    } catch (e) {
     await  this.errorToast(e.error.message)
      console.log('errore', e.error.message)
    }
  };

  register = () => this.router.navigate(['/signup']);
  goToFeeds = () => this.router.navigate(['/feeds']);
  goToChats = () => this.router.navigate(['/chats']);
  createChat = () => this.router.navigate(['/create-chat']);
  viewUsers = () => this.router.navigate(['/users']);
}
