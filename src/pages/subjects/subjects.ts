import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SubjectProvider } from '../../providers/subject/subject';
import { MessagePage } from '../message/message';
import * as _ from 'lodash';
import { GroupgradePage } from '../groupgrade/groupgrade';
import { StudentsPage } from '../students/students';

/**
 * Generated class for the SubjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subjects',
  templateUrl: 'subjects.html',
})
export class SubjectsPage {
  subjects:any = {};
  groups:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public Subject: SubjectProvider, public alertCtrl: AlertController) {
  }

  ionViewDidEnter(){
    this.Subject.getSubjects().then(data=>{
      
      if(Object.keys(data).length < 2){
        this.subjects = data[0];
      }else{
        let group = _.map(data,'name');
        this.subjects = _.uniq(group);
        this.groups = _.groupBy(data,'name');
        
      }
    })
  }


  nextPage(subject){    
    if(this.groups[subject].length > 1){
      this.navCtrl.push(GroupgradePage,{'group':this.groups[subject]});
    }else{
      this.Subject.getStudent(this.groups[subject][0]['group_grade']['id']).then(data=>{
        if(data==''){
          let errorStudents = this.alertCtrl.create({
            title: 'Not Students',
            buttons: ['OK!']
        });
        errorStudents.present();
        }else{
          this.navCtrl.push(StudentsPage,{'students':data,'group_name':this.groups[subject][0]['group_grade']['name']});
        }
      });
    }
  }
}
