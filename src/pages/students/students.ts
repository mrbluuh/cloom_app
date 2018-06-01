import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ModalAdwardPage } from '../modal-adward/modal-adward';

/**
 * Generated class for the StudentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-students',
  templateUrl: 'students.html',
})
export class StudentsPage {
  students:any;
  group_name:any;
  adwards:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public Auth: AuthProvider, public modalCtrl:ModalController) {
    this.students = this.navParams.get('students');
    this.group_name = this.navParams.get('group_name');
    
  }

  ionViewDidLoad(){
    this.Auth.getAdwards().then(data=>{
      this.adwards = data;
    })
  }


  openModalAdwards(id) {
    let modal = this.modalCtrl.create(ModalAdwardPage,{'adwards':this.adwards, 'id_user':id});
    modal.onDidDismiss(()=>{
      this.ionViewDidLoad();
    })
    modal.present();
  }
}
