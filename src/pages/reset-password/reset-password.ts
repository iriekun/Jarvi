import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../providers/user-service';
/*
  Generated class for the ResetPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
  providers: [UserService]

})
export class ResetPasswordPage {
  public resetPasswordForm;
  submitAttempt: boolean = false;
  loading: any;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public userService: UserService, 
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController
  ) {
  	this.resetPasswordForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required])]
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  resetPassword(){
     this.submitAttempt = true;

  if (!this.resetPasswordForm.valid){
    console.log(this.resetPasswordForm.value);
  } else {
    this.userService.resetPasswordUser(this.resetPasswordForm.value.email).then((user) => {
      let alert = this.alertCtrl.create({
        message: "We just sent you a reset link to your email",
        buttons: [
          {
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();

    }, (error) => {
      var errorMessage: string = error.message;
      let errorAlert = this.alertCtrl.create({
        message: errorMessage,
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });

      errorAlert.present();
    });
  }
  }

}
