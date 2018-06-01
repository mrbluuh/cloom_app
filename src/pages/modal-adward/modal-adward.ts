import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ModalAdwardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-adward',
  templateUrl: 'modal-adward.html',
})
export class ModalAdwardPage {
  adwards:any;
  iduser:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private viewCtrl:ViewController, public Auth: AuthProvider, public alertCtrl: AlertController) {
    this.adwards =  this.navParams.get('adwards');
    this.iduser = this.navParams.get('id_user');

  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  addAdward(adward){
    this.Auth.addAdward(this.iduser,adward.id).then(data=>{
      if(data=='success'){
        let success = this.alertCtrl.create({
          title: 'Adward Added',
          buttons: ['Ok']
        });
        success.present();
        this.viewCtrl.dismiss();
      }
    })
  }

}
