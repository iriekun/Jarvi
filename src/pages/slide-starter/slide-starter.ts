import { Component} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

/*
  Generated class for the SlideStarter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-slide-starter',
  templateUrl: 'slide-starter.html',

})
export class SlideStarterPage {

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController
    ) {

  }
  openModalLogin() {
    // let modal = this.modalCtrl.create(LoginPage);
    // modal.present();
    this.navCtrl.push(LoginPage);
  }
  openModalSignup(){
    // let modal = this.modalCtrl.create(SignupPage);
    // modal.present();
    this.navCtrl.push(SignupPage);
  }

slides = [
  {
    title: "WANT TO BE A SCIENTIST?",
    description: "Being a scientist is fun and easy! Help your community by submitting your observations.",
    image: "assets/img/compact.jpg",
  },
  {
    title: "ARE YOU READY TO START?",
    description: "Join the community to make <b>observation</b> and have <b>fun</b>",
    image: "assets/img/lake.jpg",
  }
];
 

}
