import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { ModalNotfsPage } from '../modal-notfs/modal-notfs';
import { MessageProvider } from '../../providers/message/message';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  messages:any;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public modalCtrl: ModalController,
      public Message:MessageProvider) {
      
  }


  ionViewDidLoad(){
    this.Message.showMessages()
        .then(data => {
          for (let message of data['messages']){
            if(message.id_type_message == 1){
              message.type = 'Important';
            }else{
              message.type = 'Normal';
            }
          }
          this.messages = data['messages'];
          
        });
  }

  refresh(refresher){

    this.Message.showMessages()
        .then(data => {
          for (let message of data['messages']){
            if(message.id_type_message == 1){
              message.type = 'Important';
            }else{
              message.type = 'Normal';
            }
          }
          this.messages = data['messages'];
          this.Message.getMessageBadges();
        });

      setTimeout(() => {
        refresher.complete();
      }, 1000);
  }

  openModal(MessageData) {
    let modal = this.modalCtrl.create(ModalNotfsPage,{'Message':MessageData});
    modal.present();
    this.Message.changeStatusNotf(MessageData.id).then(data => {
      this.Message.getMessageBadges();
    });
  }


}
