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
    { title: 'NewsFeed', name: 'NewsFeed', component: TabsPage, tabComponent: NewsfeedPage, index:0, icon:'home' },
    { title: 'Archives', name: 'Archive', component: TabsPage, tabComponent: ArchivePage, index:1, icon:'archive' },
    { title: 'Messages', name: 'Message', component: TabsPage, tabComponent: MessagePage, index:2, icon:'notifications' },
  ]


  user:any = {};
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public auth:AuthProvider) {
        
        this.auth.getUser().then(data=>{
          if(data['success']['role_id'] == 1){
            this.user = data.success;
            this.pages.push({ title: 'Create Message', name: 'CreateMessage', component: CreatemessagePage,  icon:'create' })
          }
        })

        console.log(this.user.avatar);
        
    
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
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'cloomb';
    }
    return;
  }
}
