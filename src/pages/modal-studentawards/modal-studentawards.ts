import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ModalStudentawardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-studentawards',
  templateUrl: 'modal-studentawards.html',
})
export class ModalStudentawardsPage {
  adwards:any = {};
  student:any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              public Auth: AuthProvider, public alertCtrl: AlertController) {
    this.student =  this.navParams.get('student');
  }

  ionViewDidEnter() {

    this.Auth.getStudentAward(this.student.id).then(data=>{
      if(data==''){
        let errorStudents = this.alertCtrl.create({
          title: 'Not Awards Found',
          buttons: ['Ok']
      });
      errorStudents.present();
      this.viewCtrl.dismiss();
      }else{
        if(Object.keys(data).length < 2){
          this.adwards = data[0]['adward'];
        }else{
          this.adwards = data;
        }
      }
    })
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
