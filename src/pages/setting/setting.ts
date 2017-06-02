import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';


import { ProfilePage } from '../profile/profile';
import { AboutPage } from '../about/about';


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
) {

  }
  openProfilePage(){
    this.navCtrl.push(ProfilePage);
  }

  openAboutPage(){
    this.navCtrl.push(AboutPage, {
      page:1
    });
  }
  openPrivacyPage(){
    //this.navCtrl.push(PrivacyPage);
    this.navCtrl.push(AboutPage, {
      page:2
    });
  }
  openFeedbackPage(){
     this.navCtrl.push(AboutPage, {
      page:3
    });
  }

  logout(){
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      subTitle: 'You will need to login again to keep using the application',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Ok',
          handler: ()=>{
            this.userService.logoutUser().then(() => {
              window.location.reload();
              //this.navCtrl.parent.parent.setRoot(SlideStarterPage);
              console.log("logout");
            });
          }
        }
      ]
    });
    alert.present();    
  }

}
