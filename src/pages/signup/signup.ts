import { Component } from '@angular/core';
import { ModalController, NavController, NavParams,ViewController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../providers/user-service';

import { TabsPage } from '../tabs/tabs';

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
  constructor( 
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public userService: UserService, 
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController) {

    this.signupForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
  	
  }
  goToTabsPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(TabsPage);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  signup(){
  this.submitAttempt = true;

    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.userService.signupUser(this.signupForm.value.email, this.signupForm.value.password,
        this.signupForm.value.username).then(() => {
        this.navCtrl.push(TabsPage);
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
      this.loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
      });
      this.loading.present();
      
    }
  }
}
