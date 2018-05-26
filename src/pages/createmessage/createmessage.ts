import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';
import { SidemenuPage } from '../sidemenu/sidemenu';
import { NewsfeedPage } from '../newsfeed/newsfeed';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the CreatenotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createmessage',
  templateUrl: 'createmessage.html',
})
export class CreatemessagePage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public alertCtrl:AlertController, 
      public Message: MessageProvider) {
  }

  createMessage(formData){
    this.Message.createMessage(formData.value).then(data=>{
      let alert = this.alertCtrl.create({
        title: 'Message Sent',
        buttons: ['OK!']
      });
      alert.present();
    });
  }

  backbtn(){
    this.navCtrl.setRoot(TabsPage);
  }

}
