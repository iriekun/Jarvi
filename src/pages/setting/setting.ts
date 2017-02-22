import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ViewController, App } from 'ionic-angular';
import { UserService } from '../../providers/user-service';


import { ProfilePage } from '../profile/profile';
import { SlideStarterPage } from '../slide-starter/slide-starter';


/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
  providers: [UserService]
})
export class SettingPage {
    loading: any;


  constructor(
    public navCtrl: NavController, 
    public userService: UserService,
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public appCtrl: App
) {

  }
  openProfilePage(){
    this.navCtrl.push(ProfilePage);
  }

  logout(){
    this.userService.logoutUser().then(() => {
      //this.appCtrl.getRootNav().setRoot(SlideStarterPage);
      this.navCtrl.parent.parent.setRoot(SlideStarterPage);
      console.log("logout");
    });
  }

}
