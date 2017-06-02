import { Component, NgZone } from '@angular/core';
import { Platform, ModalController, NavController, NavParams,ViewController} from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase';



/*
  Generated class for the SlideMission page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-slide-mission',
  templateUrl: 'slide-mission.html'
})
export class SlideMissionPage {
  

  public databaseRef : any; 
  public user: any;
  agent: any;

  slides = [
    {  
      desc:"",
      images: "assets/img/s1.png"
    },
    { 
      desc: "we have been looking for you everywhere and yeah finally we found you.",
      images: "assets/img/s2.png"
    },
    {  
      desc: "",
      images: "assets/img/s3.png"
    },
    {  
      desc: "",
      images: "assets/img/s4.png"
    },
    { 
      desc: "",
      images: "assets/img/s5.png"
    },
    { 
      desc: "",
      images: "assets/img/s6.png"
    },
    { 
      desc: "We hope you will join us!", 
      images: "assets/img/s7.png"
    },
   
  ];
  
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private navParams: NavParams,
    private zone: NgZone) {

      this.user = firebase.auth().currentUser;
      this.databaseRef = firebase.database().ref();

      this.databaseRef.child('/users/'+ this.user.uid).once("value").then((snapshot) =>{
        this.agent = snapshot.val().user_name;
      });  
  }



  openLink(){
      let browser = new InAppBrowser('https://ionic.io', '_system', "location=yes");
      browser.show();
  }
  goToTabPage(){
    this.zone.run(() => {
      this.navCtrl.setRoot(TabsPage);
    });
  }
}
