import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SubjectProvider } from '../../providers/subject/subject';
import { StudentsPage } from '../students/students';

/**
 * Generated class for the GroupgradePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groupgrade',
  templateUrl: 'groupgrade.html',
})
export class GroupgradePage {
  groups:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public Subject: SubjectProvider, public alertCtrl: AlertController) {
    this.groups = this.navParams.get('group');
  }

  nextPage(id,name){
    this.Subject.getStudent(id).then(data=>{
      if(data==''){
        let errorStudents = this.alertCtrl.create({
          title: 'Not Students',
          buttons: ['OK!']
      });
      errorStudents.present();
        
      }else{
        this.navCtrl.push(StudentsPage,{'students':data,'group_name':name});
      }
    })
  }

}
