import { Component, NgZone } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../providers/user-service';
import firebase from 'firebase'; 

import { TabsPage } from '../tabs/tabs';
import { SlideMissionPage } from '../slide-mission/slide-mission';

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [UserService]
})
export class SignupPage {
  public signupForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  userProfile: any = null;
  databaseRef: any;
  page= TabsPage;

  constructor( 
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public userService: UserService, 
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController,
    private zone: NgZone) {

    this.signupForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
   this.databaseRef = firebase.database().ref();
  	
  }
  ionViewDidEnter(){
     console.log("navid" +this.navCtrl.id);

  }
  goToTabsPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(TabsPage);
  }
  dismiss() {
    this.navCtrl.popToRoot();
  }
  signup(){
    this.submitAttempt = true;

    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.loading = this.loadingCtrl.create({
          content:'Please wait...',
       });
      this.loading.present();

      this.userService.signupUser(this.signupForm.value.email, this.signupForm.value.password,
        this.signupForm.value.username).then(() => {

           this.navCtrl.push(SlideMissionPage);

           // this.zone.run(() => {
           //   this.navCtrl.setRoot(TabsPage);
           // });
            this.loading.dismiss();


        }, (error) => {
          this.loading.dismiss();
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
    }
  }
 facebookLogin(){ 
    this.loading = this.loadingCtrl.create({
      content:'Please wait...',
      duration: 4000
    });
    this.loading.present();
    this.userService.loginFacebook(SlideMissionPage);
   
  }
}
