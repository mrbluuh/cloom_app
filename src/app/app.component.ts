import { Component, ViewChild  } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';
import { TabsPage } from '../pages/tabs/tabs';
import { ArchivePage } from '../pages/archive/archive';
import { SidemenuPage } from '../pages/sidemenu/sidemenu';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  @ViewChild(Nav) nav: Nav;

  constructor(
        platform: Platform, 
        statusBar: StatusBar, 
        splashScreen: SplashScreen, 
        private auth: AuthProvider) {
  
    if(window.localStorage.getItem('token') != null){
      this.auth.isLogged().then(data => {
        if(data.success){
          this.rootPage = SidemenuPage;
        }else{
          this.rootPage = LoginPage;
        }
      });
    }else{
      this.rootPage = LoginPage;
    }

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
