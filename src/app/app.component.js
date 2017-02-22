var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import * as firebase from 'firebase';
import { ObservationPage } from '../pages/observation/observation';
var MyApp = (function () {
    // rootPage = SlideStarterPage; //LoginPage;//TabsPage;
    function MyApp(platform) {
        var config = {
            apiKey: "AIzaSyA5kVVLUKGZ-i_7U7UD1FzOyck8BM22KoA",
            authDomain: "jarvigogreen.firebaseapp.com",
            databaseURL: "https://jarvigogreen.firebaseio.com",
            storageBucket: "jarvigogreen.appspot.com",
            messagingSenderId: "678984129612"
        };
        firebase.initializeApp(config);
        this.rootPage = ObservationPage; //SlideStarterPage;//TabsPage;
        // firebase.auth().onAuthStateChanged((user) => {
        //   if (user) {
        //     // User is signed in.
        //     this.rootPage = ;
        //   } else { 
        //      this.rootPage = LoginPage;
        //   }
        // });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map