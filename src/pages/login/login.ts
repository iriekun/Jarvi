import { Component, NgZone } from '@angular/core';
import { ModalController, NavController,ViewController, LoadingController, AlertController  } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../providers/user-service';

import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignupPage } from '../signup/signup';

import { SlideMissionPage } from '../slide-mission/slide-mission';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [UserService]

  })
  export class LoginPage {
    //signupPage = SignupPage;
    public loginForm;
    submitAttempt: boolean = false;
    loading: any;

    constructor(
      public navCtrl: NavController,
      public viewCtrl: ViewController,
      public modalCtrl: ModalController,
      public userService: UserService, 
      public formBuilder: FormBuilder,
      public loadingCtrl: LoadingController, 
      public alertCtrl: AlertController,
       public zone: NgZone)
    {
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
    }

    dismiss() {
      this.viewCtrl.dismiss();
    }
    openModalResetPwd(){
      // this.dismiss();
      // let modal = this.modalCtrl.create(ResetPasswordPage);
      // modal.present();
      this.navCtrl.push(ResetPasswordPage);
    }
    login(){
      this.submitAttempt = true;

      if (!this.loginForm.valid){
        console.log(this.loginForm.value);
      } else {
        this.loading = this.loadingCtrl.create({
          content:'Please wait...',
        });
        this.loading.present();
        this.userService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(() => {

          this.navCtrl.push(SlideMissionPage);

          // this.zone.run(() => {
          //   this.navCtrl.setRoot(TabsPage);
          // });
          this.loading.dismiss();

        }, error => {
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
    openModalSignup(){
      
      this.navCtrl.push(SignupPage);
      // let modal = this.modalCtrl.create(SignupPage);
      // modal.present();
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
