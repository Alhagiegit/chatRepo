import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Chat } from 'src/app/model/chat';
import { ChatService } from 'src/app/services/chat.service';
import { CreateChatPage } from '../create-chat/create-chat.page';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
 chats:Chat[];
  constructor(private modalController:ModalController, private chatServive:ChatService,private chatService:ChatService,private router: Router ) { }


  //  images=[
    
  //     "https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg",
  //    "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
  //    "https://static.remove.bg/remove-bg-web/a926ef00c5b240026e33dca1d7965424632c6781/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png",
  //    "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
  //   "https://thumbs.dreamstime.com/b/cosmos-beauty-deep-space-elements-image-furnished-nasa-science-fiction-art-102581846.jpg",
  //   "https://www.ars.usda.gov/ARSUserFiles/oc/images/photos/gallery/camera.jpg"
    
  //  ]
    async ngOnInit() {
      this.chats= await this.chatServive.getChats();
    }

     currentModal=null;
    async presentModal() {
      const modal = await this.modalController.create({
        component: CreateChatPage,
        initialBreakpoint: 0.6,
        breakpoints: [0, 0.5,0.6, 1],
        animated:true,
        backdropDismiss:true,
      });
      await modal.present();
      this.currentModal=modal;   
      await modal.onDidDismiss().then(async ({data})=>{
        this.chats= await this.chatServive.getChats();
      })
       
    }




    
    joinChat= async (chatId:string)=>{
      try {
        await this.chatService.joinChat(chatId)
        this.router.navigate(['/chat', chatId]);
        
      } catch(e) {
        this.chatService.getChat(chatId)
        this.router.navigate(['/chat', chatId]);
        console.log('error',e);

      }

    }

    //createChat = () => this.router.navigate(['/create-chat']);

  }
