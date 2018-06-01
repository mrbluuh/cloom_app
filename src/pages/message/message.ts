import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { ModalNotfsPage } from '../modal-notfs/modal-notfs';
import { MessageProvider } from '../../providers/message/message';
import { AuthProvider } from '../../providers/auth/auth';
import { ModalSentmessPage } from '../modal-sentmess/modal-sentmess';


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
  user:any = {};
  sentmessages:any;
  csent:number;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public modalCtrl: ModalController,
      public Message:MessageProvider,
      public User: AuthProvider) {
  
        
      
  }


  ionViewDidEnter(){

  this.Message.countSentMessages();
  this.Message.cast2.subscribe(csent => this.csent=csent);

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

  this.Message.getSentMessages()
    .then(data => {
      this.sentmessages = data['messages'];
    })

  this.User.getUser()
    .then(data=>{
      this.user = data['success'];
    })
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
    MessageData.status = 'TRUE';
    let modal = this.modalCtrl.create(ModalNotfsPage,{'Message':MessageData});
    modal.onDidDismiss(()=>{
      this.ionViewDidEnter();
    })
    modal.present();
    this.Message.changeStatusNotf(MessageData.id).then(data => {
      this.Message.getMessageBadges();
    });
  }


  openSentMessModal(messages){

    let modal = this.modalCtrl.create(ModalSentmessPage,{'Messages':messages});
    modal.onDidDismiss(()=>{
      this.ionViewDidEnter();
    })
    modal.present();

  }


  messageColor(message){
    if(message.type == 'Important'){
      return 'important';
    }
    return 'normal';
  }

}
