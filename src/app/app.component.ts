import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ChatService } from './services/chat.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  key={auth:true}
  constructor(private storage: Storage) {}
  async ngOnInit() {
    await this.storage.create();
  // private socketServive:ChatService
   // this.socketServive.createSocket();
  }
  
}
