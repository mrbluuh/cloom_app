import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Tab } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
import { SidemenuPage } from '../sidemenu/sidemenu';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    private auth:AuthProvider,
    public alertCtrl: AlertController
  
  ){}

  login(FormLogin){
    this.auth.login(FormLogin.value)
      .then(data => {
        console.log(data);
        
        if(data['access_token']){
          this.navCtrl.setRoot(SidemenuPage);
        }else{
          let alertNotToken = this.alertCtrl.create({
            title: 'Not valid token',
            subTitle: 'Login Again',
            buttons: ['OK']
          });
          alertNotToken.present();
        }
      });
  }
}
