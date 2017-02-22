import { Component} from '@angular/core';
import { NavController, ModalController, Platform, ViewController } from 'ionic-angular';
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
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }
  openModalSignup(){
    let modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }

slides = [
  {
    title: "Want to be a Scientist?",
    description: "Being a scientist is fun and easy! Help your community by entering your obsrvations.",
    image: "assets/img/saopolo.jpg",
  },
  {
    title: "Want to Get Recognized?",
    description: "Be the top challenger of the month and get a green citizen certificate issued from your municipality",
    image: "assets/img/saopolo.jpg",
  },
  {
    title: "Are You Ready to Accept the Mission?",
    description: "Join the community to make <b>observation</b> and have <b>fun</b>",
    image: "assets/img/saopolo.jpg",
  }
];
 

}
