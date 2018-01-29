import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { SlideStarterPage } from '../pages/slide-starter/slide-starter';
import { Connectivity } from '../providers/connectivity';


@Component({
  templateUrl: 'app.html',
    providers: [Connectivity]

})
export class MyApp {
  rootPage : any;
  zone: NgZone;


 // rootPage = SlideStarterPage; //LoginPage;//TabsPage;

  constructor(platform: Platform) {
    var config = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      storageBucket: "",
      messagingSenderId: ""
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
          //retrieve all observation points to user's map 
          // firebase.database().ref().child('/locations/').once("value").then((snapshot) =>{
          //    firebase.database().ref().child('/missions/'+firebase.auth().currentUser.uid).update(snapshot.val());
          // });

          //for pulling new mission from admin
          // let l6 ={
            
          //     latitude: 61.05972,
          //     longitude: 28.106039
            
          // }
          // firebase.database().ref().child('/missions/').once('value').then((snapshot) =>{
          //   snapshot.forEach((data) =>{
          //       console.log(data.key);
          //       firebase.database().ref().child('/missions/'+data.key).update({l6});
          //   });
         // });
       
        }
      });
                //when app open -> increase number of visit          
      firebase.database().ref().child('/users/'+firebase.auth().currentUser.uid).once("value").then((snapshot) =>{
              firebase.database().ref().child('/users/'+firebase.auth().currentUser.uid).update({
                  num_visit: snapshot.val().num_visit +1, 
                  last_visit: new Date().toString()
               });
          });     
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
   
    });
  }
}
