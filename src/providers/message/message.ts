// import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { config } from '../../app/config';

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
        .map(res => {
          res.json()
        })
        .subscribe(data => {
          resolve('success');
        })
      })
    }



}