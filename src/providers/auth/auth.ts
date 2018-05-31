// import { HttpHeaders, HttpParams} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import { config } from '../../app/config';


@Injectable()
export class AuthProvider {
  auth:any = {};
  private user = new BehaviorSubject<any>({});
  baseUrl:string = config.baseUrl;
  constructor( public http: Http, public alertCtrl: AlertController ) {
  }



  login(data){
      
      let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' });
      let options = new RequestOptions({ headers: headers });

      return new Promise(resolve => { 
        this.http.post(this.baseUrl+'login',data)
          .map(res => res.json())
          .subscribe(data => {
            this.extractData(data);
            resolve(data);
          }, error => {
            let errorLogin = this.alertCtrl.create({
              title: 'Error login',
              subTitle: 'Invalid Credentials '+error,
              buttons: ['OK']
            });
            errorLogin.present();
          });
        })
  }


  getUser(){
    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+window.localStorage.getItem('token')
      });
      let options = new RequestOptions({ headers: headers });
        
      return this.http.get( this.baseUrl+'user', options)
        .map( res => {
            let ofuser = res.json();
            ofuser.success.avatar = config.imgUrl + res.json().success.avatar;
            return ofuser;
          }).toPromise();
    
  }
  
   
  isLogged(){
    return this.getUser().then(data => {      
        return data;
      }).catch(error => {
          console.log("Token Incorrecto, inicia sesion")
          return error;
        });
  }


  logout(){
    window.localStorage.removeItem('token');
    return true;
  }


  private extractData(res: Response){
      let body = res;
      if(body['access_token']){
        window.localStorage.setItem('token',body['access_token']);
      };
    }
}
