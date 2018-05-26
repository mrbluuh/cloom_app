import { Component } from '@angular/core';
import { NewsfeedPage } from '../newsfeed/newsfeed';
import { RoutePage }    from '../route/route';
import { ArchivePage }  from '../archive/archive';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { MessageProvider } from '../../providers/message/message';
import { MessagePage } from '../message/message';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  user_role:number = 0;
  NotfBadge:number;
  tab1Root = NewsfeedPage;
  tab2Root = ArchivePage;
  tab3Root = MessagePage;
  myIndex: number;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public message: MessageProvider,
      public auth: AuthProvider) {

      // this.auth.getUser().then(data=>{
      //   this.user_role = data['success']['role_id'];
      // })

    this.myIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad(){

      this.message.getMessageBadges();
      this.message.cast.subscribe(NotfBadge => this.NotfBadge=NotfBadge);  
  }

}
