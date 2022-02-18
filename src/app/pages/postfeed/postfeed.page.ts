import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FeedsService } from 'src/app/services/feeds.service';
import { Storage } from '@ionic/storage-angular';
import { userResponce } from 'src/app/model/feeds';

@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.page.html',
  styleUrls: ['./postfeed.page.scss'],
})
export class PostfeedPage implements OnInit {
 postFeed:userResponce
  public postForm:FormGroup;
  constructor( private fb:FormBuilder,public modalCtrl:ModalController, private postService:FeedsService, private storage:Storage, private router:Router) { }

  createForm():void{
    this.postForm=this.fb.group({
     message: ['', Validators.required],
      imageUrl: ['', Validators.required],
  
     })
  }


  ngOnInit() {
    this.createForm();
  
  }

   publishFeeds= async ()=>{
   await this.postService.postFeeds(this.postForm.value.message,this.postForm.value.imageUrl )
   if(this.storage.get("auth")){
     //this.router.navigate(["/feeds"])

   }
   console.log(this.postForm.value.message)
  }

}
