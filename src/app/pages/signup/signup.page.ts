import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FeedsService } from 'src/app/services/feeds.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public postForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public modalCtrl: ModalController,
    private signupService: FeedsService,
    private router: Router,
    private toastCtr: ToastController
  ) {}

  createForm(): void {
    this.postForm = this.fb.group({
      nickname: ['', Validators.required],
      phone: ['', Validators.required],
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

  async signup() {
    try{    
      const responce = await this.signupService.signup(
        this.postForm.value.nickname,
        this.postForm.value.phone,
        this.postForm.value.password
      );
      this.successToast('registered successfully')
      this.router.navigate(['/signin']);
    }catch(e){
      this.errorToast(e.error.message)
    }

  }

  goToChats = () => {
    this.router.navigate(['/chats']);
  };
  signIn = () => this.router.navigate(['/signin']);

}
