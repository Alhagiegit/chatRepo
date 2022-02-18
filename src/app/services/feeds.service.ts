import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Like, login, postFeeds, signup, userResponce } from '../model/feeds';
import { Storage } from '@ionic/storage-angular';
const {url}=environment

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
 auth:string
  constructor(private httpClient:HttpClient, private storage: Storage) { }
  getFeeds=()=>{
    return this.httpClient.get<userResponce[]>(`${url}/feeds`).toPromise()
  }
  postFeeds= async (message:string, imageUrl:string)=>{
    console.log(this.storage.get("auth"))
    return this.httpClient.post<postFeeds>(`${url}/feeds`, { message,imageUrl },  {headers: {'Content-Type': 'application/json',authorization: `Bearer ${await this.storage.get("auth")}`}}).toPromise();
  
  }
  login=(nickname:string, password:string)=>{
   return  this.httpClient.post<{accessToken:string}>(`${url}/login`, { nickname,password}).toPromise()
  }
  signup=(nickname:string, phone:string, password:string)=>{
    return this.httpClient.post<signup>(`${url}/signin`, { nickname, phone, password}).toPromise()
  }
  postComment=(message:string, commentId:string)=>{
    this.httpClient.post(`${url}/feeds/${commentId}/comments`, message,    {headers: {'Content-Type': 'application/json',authorization: `Bearer ${this.storage.get("auth")}`}})
  }
  postLike= async (like:boolean, likeId:string)=>{
    return this.httpClient.post<Like>(`${url}/feeds/${likeId}/likes`, like,    {headers: {'Content-Type': 'application/json',authorization: `Bearer ${ await this.storage.get("auth")}`}}).toPromise();
  }

}
