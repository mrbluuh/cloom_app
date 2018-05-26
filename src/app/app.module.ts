import { NgModule, ErrorHandler }                   from '@angular/core';
import { HttpClientModule }                         from '@angular/common/http';
// import { HTTP } from '@ionic-native/http';

import { HttpModule } from '@angular/http';
import { BrowserModule }                            from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp }                                    from './app.component';


import { NewsfeedPage }   from '../pages/newsfeed/newsfeed';
import { ArchivePage }    from '../pages/archive/archive';
import { RoutePage }      from '../pages/route/route';
import { TabsPage }       from '../pages/tabs/tabs';

import { StatusBar }    from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage }    from '../pages/login/login';

import 'rxjs/add/operator/map';

import { ModalNotfsPage } from '../pages/modal-notfs/modal-notfs';
import { SidemenuPage } from '../pages/sidemenu/sidemenu';
import { SidemenuPageModule } from '../pages/sidemenu/sidemenu.module';

import { AuthProvider } from '../providers/auth/auth';
import { NewsfeedProvider } from '../providers/newsfeed/newsfeed';
import { MessageProvider } from '../providers/message/message';
import { MessagePage } from '../pages/message/message';
import { CreatemessagePage } from '../pages/createmessage/createmessage';
import { SettingsPage } from '../pages/settings/settings';


@NgModule({
  declarations: [
    MyApp,
    NewsfeedPage,
    ArchivePage,
    RoutePage,
    TabsPage,
    LoginPage,
    MessagePage,
    ModalNotfsPage,
    SidemenuPage,
    CreatemessagePage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsfeedPage,
    ArchivePage,
    RoutePage,
    TabsPage,
    MessagePage,
    LoginPage,
    ModalNotfsPage,
    SidemenuPage,
    CreatemessagePage,
    SettingsPage,


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    NewsfeedProvider,
    MessageProvider,
  ]
})
export class AppModule {}
