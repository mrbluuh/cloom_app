// import { HttpHeaders, HttpParams} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import { config } from '../../assets/js/config';


@Injectable()
export class AuthProvider {
  auth:any = {};
  private badge = new BehaviorSubject<number>(0);
  cast = this.badge.asObservable();
  
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

  getStudent(){
    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+window.localStorage.getItem('token')
      });
      let options = new RequestOptions({ headers: headers });
        
      return this.http.get( this.baseUrl+'studentuser', options)
        .map( res => {
            let students = res.json();
            return students;
          }).toPromise();
  }

  getStudentAward(id){
    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+window.localStorage.getItem('token')
      });
      let options = new RequestOptions({ headers: headers });
        
      return this.http.get( this.baseUrl+'studentadward/'+id, options)
        .map( res => {
            let awards = res.json();
            for(let aw of awards){
              aw.adward.icon = config.imgUrl + aw.adward.icon;
            }
            return awards;
          }).toPromise();
  }




  getAdwards(){

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+window.localStorage.getItem('token')
      });
      let options = new RequestOptions({ headers: headers });
        
      return this.http.get( this.baseUrl+'adwards', options)
        .map( res => {
            let adwards = res.json();
            for(let a of adwards){
              a.icon = config.imgUrl + a.icon;
            }
            return adwards;
          }).toPromise();
  }

  addAdward(id_student:number, id_adward:number){

    var data ={"id_student":id_student,"id_adward":id_adward}
      let headers = new Headers(
        {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+window.localStorage.getItem('token')
        });
      let options = new RequestOptions({ headers: headers });

      return new Promise(resolve => {
        this.http.post(this.baseUrl+'addadward',data,options)
        .map(res => res.json() )
        .subscribe(data => {
          resolve('success');
        })
      })

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
