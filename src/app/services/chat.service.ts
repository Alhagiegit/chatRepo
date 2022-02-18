import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { Chat, Message } from '../model/chat';
import { Socket } from 'socket.io-client';
const {url}=environment

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient:HttpClient, private storage: Storage) { }
  // private socket:Socket
  // createSocket=()=>{
  //   this.socket.connect();
  // }

  getChats=()=>{
    return this.httpClient.get<Chat[]>(`${url}/chats`).toPromise()
  }

  getChat=(ChatId:string)=>{
    return this.httpClient.get<Chat>(`${url}/chats/${ChatId}`).toPromise()
  }
  joinChat= async (ChatId:string)=>{
    console.log( 'prov',await  this.storage.get("auth"))
    return this.httpClient.put<Chat>(`${url}/chats/${ChatId}`,{}, {headers: {'Content-Type': 'application/json',authorization: `Bearer ${await this.storage.get("auth")}`}} ).toPromise()
  }

  createChat= async (title:string, imageUrl:string)=>{
    return this.httpClient.post<Chat>(`${url}/chats`, { title,imageUrl },  {headers: {'Content-Type': 'application/json',authorization: `Bearer ${await this.storage.get("auth")}`}}).toPromise(); 
  }

  sendMessage= async (message:string, chatId:string)=>{
    return this.httpClient.post<Message>(`${url}/chats/${chatId}/messages`, {message},  {headers: {'Content-Type': 'application/json',authorization: `Bearer ${await this.storage.get("auth")}`}}).toPromise(); 
  }
  getUsers=()=>{
    return this.httpClient.get<{nickname:string, phone:string}[]>(`${url}/users`).toPromise()
  }
}
