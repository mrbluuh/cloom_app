import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the ModalNotfsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-notfs',
  templateUrl: 'modal-notfs.html',
})
export class ModalNotfsPage {
  message:any;
  constructor(
      public platform: Platform,
      public navCtrl: NavController, 
      public navParams: NavParams, 
      private viewCtrl: ViewController) {

        this.message = this.navParams.get('Message')
        
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
