// import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { config } from '../../assets/js/config';
import moment from 'moment';


/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageProvider {
  baseUrl:string = config.baseUrl;
  data:any;
  cbadge:number = 0;
  private badge = new BehaviorSubject<number>(0);
  cast = this.badge.asObservable();
  private csent = new BehaviorSubject<number>(0);
  cast2 = this.csent.asObservable();
  constructor(public http: Http) {
  }


  createMessage(MessageData){

    let headers = new Headers(
      {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+window.localStorage.getItem('token')
      });
    let options = new RequestOptions({ headers: headers });
        
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'createmesg',MessageData,options)
      .map(res => {
        this.data = res.json();
        resolve(this.data);
      })
      .subscribe(data=>{
      })
    }) 

  }
  
  getSentMessages(){
    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+window.localStorage.getItem('token')
      });
    let options = new RequestOptions({ headers: headers });
        
    
      return new Promise(resolve => {
        this.http.get(this.baseUrl+'sentmessages',options)
        .map(res => {
          this.data = res.json();
          for(let message of this.data.messages){
            message.created_at = moment().format("dddd, MMMM YYYY");  
            message.userto.avatar = config.imgUrl + message.userto.avatar
          }
          resolve(this.data);
        })
        .subscribe(data=>{
        })
      }) 

  }

  countSentMessages(){
    var count:number = 0;
    this.getSentMessages().then(data=>{
      this.csent.next(Object.keys(data['messages']).length);
    })
  }

  showMessages(){
    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+window.localStorage.getItem('token')
      });
    let options = new RequestOptions({ headers: headers });
        
    
      return new Promise(resolve => {
        this.http.get(this.baseUrl+'message',options)
        .map(res => {
          this.data = res.json();
          for(let message of this.data.messages){
            message.created_at = moment().format("dddd, MMMM YYYY");  
            message.user.avatar = config.imgUrl + message.user.avatar
          }
          resolve(this.data);
        })
        .subscribe(data=>{
        })
      }) 
    }


    getMessageBadges(){
      var count:number = 0;
      this.showMessages().then(data=>{
          for (let message of data['messages']){
            if(message.status == 'FALSE'){
              count++;
            }
          }
          this.badge.next(count);
      });
    }



    changeStatusNotf(id:number){
      
      var data ={"id":id}
      let headers = new Headers(
        {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+window.localStorage.getItem('token')
        });
      let options = new RequestOptions({ headers: headers });

      return new Promise(resolve => {
        this.http.post(this.baseUrl+'messagestatus',data,options)
        .map(res => res.json() )
        .subscribe(data => {
          resolve('success');
        })
      })
    }


    deleteMessage(id){
      let headers = new Headers(
        {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+window.localStorage.getItem('token')
        });
      let options = new RequestOptions({ headers: headers });

      return new Promise(resolve => {
        this.http.get(this.baseUrl+'deletemessage/'+id,options)
        .map(res => res.json() )
        .subscribe(data => {
          resolve('success');
        })
      })

    }



}
