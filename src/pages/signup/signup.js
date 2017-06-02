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
import { NavController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../providers/user-service';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';
/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SignupPage = (function () {
    function SignupPage(navCtrl, viewCtrl, userService, formBuilder, loadingCtrl, alertCtrl, zone) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.zone = zone;
        this.emailChanged = false;
        this.passwordChanged = false;
        this.submitAttempt = false;
        this.userProfile = null;
        this.page = TabsPage;
        this.signupForm = formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            email: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
        this.databaseRef = firebase.database().ref();
    }
    SignupPage.prototype.ionViewDidEnter = function () {
        console.log("navid" + this.navCtrl.id);
    };
    SignupPage.prototype.goToTabsPage = function () {
        //push another page onto the history stack
        //causing the nav controller to animate the new page in
        this.navCtrl.push(TabsPage);
    };
    SignupPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SignupPage.prototype.signup = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        }
        else {
            this.loading = this.loadingCtrl.create({
                content: 'Please wait...',
            });
            this.loading.present();
            this.userService.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.username).then(function () {
                _this.zone.run(function () {
                    _this.navCtrl.setRoot(TabsPage);
                });
                _this.loading.dismiss();
            }, function (error) {
                _this.loading.dismiss();
                var alert = _this.alertCtrl.create({
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
        }
    };
    SignupPage.prototype.facebookLogin = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            duration: 4000
        });
        this.loading.present();
        this.userService.loginFacebook(TabsPage);
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Component({
        selector: 'page-signup',
        templateUrl: 'signup.html',
        providers: [UserService]
    }),
    __metadata("design:paramtypes", [NavController,
        ViewController,
        UserService,
        FormBuilder,
        LoadingController,
        AlertController,
        NgZone])
], SignupPage);
export { SignupPage };
//# sourceMappingURL=signup.js.map