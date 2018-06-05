import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, PageTransition } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { NewsfeedPage } from '../newsfeed/newsfeed';
import { ArchivePage } from '../archive/archive';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { MessagePage } from '../message/message';
import { CreatemessagePage } from '../createmessage/createmessage';
import { MapsPage } from '../maps/maps';
import { SubjectsPage } from '../subjects/subjects';
import { ChildPage } from '../child/child';
/**
 * Generated class for the SidemenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}


@IonicPage()
@Component({
  selector: 'page-sidemenu',
  templateUrl: 'sidemenu.html',
})

export class SidemenuPage {
    

  rootPage = TabsPage;

  @ViewChild(Nav) nav: Nav;
  pages: PageInterface[] = [
    { title: 'Newsfeed', name: 'Newsfeed', component: TabsPage, tabComponent: NewsfeedPage, index:0, icon:'home' },
    { title: 'Maps', name: 'Maps', component: TabsPage, tabComponent: MapsPage, index:1, icon:'map' },
    { title: 'Messages', name: 'Message', component: TabsPage, tabComponent: MessagePage, index:2, icon:'notifications' },
  ]


  user:any = {};
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public auth:AuthProvider) {
        
        this.auth.getUser().then(data=>{
          this.user = data.success;
          if(data.success.role_id == 1){
            this.pages.push({ title: 'Create message', name: 'CreateMessage', component: CreatemessagePage,  icon:'create' });
          }else if(data.success.role_id == 2){
            this.pages.push({ title: 'Subjects', name: 'Subjects', component: TabsPage, tabComponent: SubjectsPage, index:3, icon:'book' });
            this.pages.push({ title: 'Create message', name: 'CreateMessage', component: CreatemessagePage,  icon:'create' });
          }else if(data.success.role_id == 3){
            this.pages.push({ title: 'Students', name: 'Students', component: TabsPage, tabComponent: ChildPage, index:3, icon:'body' });
          }
        })
  }

  logout(){
    if(this.auth.logout()){
      this.navCtrl.setRoot(LoginPage);
    }

  }

    
  openPage(page: PageInterface) {
    let params = {};
 
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      this.nav.setRoot(page.component, params);
    }
  }
 
  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'cloomb';
      }
      return 'cloom';
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'cloomb';
    }
    return 'cloom';
  }
}
