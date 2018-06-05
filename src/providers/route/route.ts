import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { config } from '../../assets/js/config';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the RouteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RouteProvider {

  baseUrl:string = config.baseUrl;
  constructor(public http: Http) {
  }


  getPositionCar(){

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+window.localStorage.getItem('token')
      });
      let options = new RequestOptions({ headers: headers });
        
      return this.http.get( this.baseUrl+'driverpst/19', options)
        .map( res =>{
          return Observable
            .interval(2000)
            .switchMap(()=> res.json())
            .share();
        })

  }



}
