import { Component } from '@angular/core';
import { ModalController, NavController,ViewController, LoadingController, AlertController  } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../providers/user-service';

import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

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
      public alertCtrl: AlertController)
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
      this.dismiss();
      let modal = this.modalCtrl.create(ResetPasswordPage);
      modal.present();
    }
    login(){
      this.submitAttempt = true;

      if (!this.loginForm.valid){
        console.log(this.loginForm.value);
      } else {
        this.userService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(() => {
          this.navCtrl.push(TabsPage);
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

        this.loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        this.loading.present();
      }

    }
    openModalSignup(){
      this.dismiss();
      let modal = this.modalCtrl.create(SignupPage);
      modal.present();
    }

  }
