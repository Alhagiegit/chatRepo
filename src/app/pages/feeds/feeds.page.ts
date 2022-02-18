import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userResponce } from 'src/app/model/feeds';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
})
export class FeedsPage implements OnInit {
 feeds:userResponce[]=[];
  constructor(private feedsService:FeedsService, private router:Router) { }
res=0;
  async ngOnInit() {
    this.feeds= await this.feedsService.getFeeds()

  console.log(this.feeds);
  }

  getLike=async(Id:string)=>{
    this.res=1
    const re= await this.feedsService.postLike(true, Id);
    console.log(re)
  }
  goToChats = () => this.router.navigate(['/chats']);
}
