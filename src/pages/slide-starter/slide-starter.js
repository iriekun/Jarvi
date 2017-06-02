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
import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
/*
  Generated class for the SlideStarter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SlideStarterPage = (function () {
    function SlideStarterPage(modalCtrl, navCtrl) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.slides = [
            {
                title: "Want to be a Scientist?",
                description: "Being a scientist is fun and easy! Help your community by entering your obsrvations.",
                image: "",
            },
            {
                title: "Are You Ready to Start?",
                description: "Join the community to make <b>observation</b> and have <b>fun</b>",
                image: "",
            }
        ];
    }
    SlideStarterPage.prototype.openModalLogin = function () {
        var modal = this.modalCtrl.create(LoginPage);
        modal.present();
    };
    SlideStarterPage.prototype.openModalSignup = function () {
        var modal = this.modalCtrl.create(SignupPage);
        modal.present();
    };
    return SlideStarterPage;
}());
SlideStarterPage = __decorate([
    Component({
        selector: 'page-slide-starter',
        templateUrl: 'slide-starter.html',
    }),
    __metadata("design:paramtypes", [ModalController,
        NavController])
], SlideStarterPage);
export { SlideStarterPage };
//# sourceMappingURL=slide-starter.js.map