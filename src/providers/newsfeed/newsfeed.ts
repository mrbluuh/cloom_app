import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { config } from '../../app/config';

/*
  Generated class for the PostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsfeedProvider {
  baseUrl:string = config.baseUrl;
  data: any;
  constructor(public http: Http) {
    
  }



  showNewsfeed(){
    if(this.data){
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => { 
      this.http.get(this.baseUrl+'newsfeed',{headers:new Headers({ 'Content-Type': 'application/json' })})
        .map(res =>  res.json())
        .subscribe(data => {
          for(let news of data){
            if(news.image == null){
              news.image = 'http://via.placeholder.com/350x150';
            }else{
            news.image = config.imgUrl+news.image;
            }
          }
          this.data = data;
          resolve(this.data);
        })
      })
    }

}
