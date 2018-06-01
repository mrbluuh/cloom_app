import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalSentmessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-sentmess',
  templateUrl: 'modal-sentmess.html',
})
export class ModalSentmessPage {
  messages:any = {}
  constructor(
    public platform: Platform,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {

      this.messages = this.navParams.get('Messages');
      for(let message of this.messages){
        if(message.status=='TRUE'){
          message.status = 'Yes';
        }else{
          message.status = 'No';
        }if(message.accepted==1){
          message.accepted = 'Yes';
        }else{
          message.accepted = 'No';
        }
      }
  }

  ionViewDidLoad() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
