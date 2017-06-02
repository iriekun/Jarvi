var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { SlideStarterPage } from '../pages/slide-starter/slide-starter';
import { Connectivity } from '../providers/connectivity';
var MyApp = (function () {
    // rootPage = SlideStarterPage; //LoginPage;//TabsPage;
    function MyApp(platform) {
        var _this = this;
        var config = {
            apiKey: "AIzaSyA5kVVLUKGZ-i_7U7UD1FzOyck8BM22KoA",
            authDomain: "jarvigogreen.firebaseapp.com",
            databaseURL: "https://jarvigogreen.firebaseio.com",
            storageBucket: "jarvigogreen.appspot.com",
            messagingSenderId: "678984129612"
        };
        firebase.initializeApp(config);
        this.zone = new NgZone({});
        var unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
            _this.zone.run(function () {
                if (!user) {
                    _this.rootPage = SlideStarterPage;
                    unsubscribe();
                    console.log("user is logout");
                }
                else {
                    _this.rootPage = TabsPage;
                    unsubscribe();
                    console.log("user is login");
                }
            });
        });
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
        templateUrl: 'app.html',
        providers: [Connectivity]
    }),
    __metadata("design:paramtypes", [Platform])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map