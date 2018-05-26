import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ModalNotfsPage } from '../modal-notfs/modal-notfs';
import { NewsfeedProvider } from '../../providers/newsfeed/newsfeed';

/**
 * Generated class for the NewsfeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector:    'page-newsfeed',
  templateUrl: 'newsfeed.html',
})
export class NewsfeedPage {
  newsfeeds:any;
  constructor(
      public http: Http,
      public navCtrl: NavController,  
      public navParams: NavParams, 
      private modal: ModalController,
      public Newsfeed: NewsfeedProvider) {
  }

  ionViewDidLoad(){
    this.Newsfeed.showNewsfeed()
          .then(data => {
            this.newsfeeds = data;
          })
  }

}
