import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { config } from '../../assets/js/config';
import moment from 'moment';

/*
  Generated class for the SubjectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubjectProvider {
  baseUrl:string = config.baseUrl;
  subjects:any;
  students:any;
  constructor(public http: Http) {

    
  }
  
  getStudent(id){

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+window.localStorage.getItem('token')
      });
    let options = new RequestOptions({ headers: headers });
        
    
      return new Promise(resolve => {
        this.http.get(this.baseUrl+'studentgroup/'+id,options)
        .map(res => res.json() )
        .subscribe(data=>{
          this.students = data;
          resolve(this.students);
        })
      }) 
    
  }


  getSubjects(){
    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+window.localStorage.getItem('token')
      });
    let options = new RequestOptions({ headers: headers });
        
    
      return new Promise(resolve => {
        this.http.get(this.baseUrl+'subject',options)
        .map(res => res.json() )
        .subscribe(data=>{
          this.subjects = data['subjects'];
          resolve(this.subjects);
        })
      }) 

  }

}
