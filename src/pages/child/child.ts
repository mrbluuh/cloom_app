import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ModalAdwardPage } from '../modal-adward/modal-adward';
import { ModalStudentawardsPage } from '../modal-studentawards/modal-studentawards';

/**
 * Generated class for the ChildPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-child',
  templateUrl: 'child.html',
})
export class ChildPage {
  students:any = {};
  awards:any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public Auth: AuthProvider, private modalCtrl: ModalController) {
  }

  ionViewDidEnter() {
    this.Auth.getStudent().then(data=>{
      this.students = data;
    });
  }

  openModalAdwards(student) {

    let modal = this.modalCtrl.create(ModalStudentawardsPage,{'student':student});
    modal.onDidDismiss(()=>{
      this.ionViewDidEnter();
    })
    modal.present();
  }


  

}
