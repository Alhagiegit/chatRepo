import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
users:{nickname:string, phone:string}[]
  constructor(private userService:ChatService) { }

  ngOnInit() {

this.getUsers()
  }

  getUsers= async ()=>{
   this.users= await this.userService.getUsers()
  }

}
