import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, AlertController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';

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
      private viewCtrl: ViewController,
      public alertCtrl: AlertController,
      public messageProvider: MessageProvider) {

        this.message = this.navParams.get('Message');
        
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  deleteMessage(id,status,type,accepted){
    console.log(status);
    if(type=="Important"){
      if(status=='TRUE' && accepted==1){
        this.messageProvider.deleteMessage(id).then(data=>{
          let deletemessage = this.alertCtrl.create({
            title: 'Message removed',
            buttons: ['OK!']
          });
          deletemessage.present();
          this.viewCtrl.dismiss();
        })
      }else{
        let errornotTrue = this.alertCtrl.create({
            title: 'Message has no been accepted',
            buttons: ['OK!']
        });
        errornotTrue.present();
      }
    }else{
      if(status != 'TRUE'){
        let errornotTrue = this.alertCtrl.create({
          title: 'Message has no been read',
          buttons: ['OK!']
        });
        errornotTrue.present();
      }else{
        this.messageProvider.deleteMessage(id).then(data=>{
          let deletemessage = this.alertCtrl.create({
            title: 'Message removed',
            buttons: ['OK!']
          });
          deletemessage.present();
          this.viewCtrl.dismiss();
        })
      }      
    }
  }


  

}
