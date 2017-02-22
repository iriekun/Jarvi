import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import * as firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SlideStarterPage } from '../pages/slide-starter/slide-starter';
import { ObservationPage } from '../pages/observation/observation';
import { ProfilePage } from '../pages/profile/profile';
import { SignupPage } from '../pages/signup/signup';
import { ActivityPage } from '../pages/activity/activity';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage : any;
  zone: NgZone;

 // rootPage = SlideStarterPage; //LoginPage;//TabsPage;

  constructor(platform: Platform) {
    var config = {
      apiKey: "AIzaSyA5kVVLUKGZ-i_7U7UD1FzOyck8BM22KoA",
      authDomain: "jarvigogreen.firebaseapp.com",
      databaseURL: "https://jarvigogreen.firebaseio.com",
      storageBucket: "jarvigogreen.appspot.com",
      messagingSenderId: "678984129612"
    };
    firebase.initializeApp(config);

    this.zone = new NgZone({});
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = SlideStarterPage;
          unsubscribe();
          console.log("user is logout");

        } else { 
          this.rootPage = TabsPage; 
          unsubscribe();
          console.log("user is login");
        }
      });     
    });
  //  this.rootPage = SlideStarterPage;


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      
    });
  }
}
