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
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { ProfilePage } from '../profile/profile';
import { AboutPage } from '../about/about';
/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SettingPage = (function () {
    function SettingPage(navCtrl, userService, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.userService = userService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }
    SettingPage.prototype.openProfilePage = function () {
        this.navCtrl.push(ProfilePage);
    };
    SettingPage.prototype.openAboutPage = function () {
        this.navCtrl.push(AboutPage, {
            page: 1
        });
    };
    SettingPage.prototype.openPrivacyPage = function () {
        //this.navCtrl.push(PrivacyPage);
        this.navCtrl.push(AboutPage, {
            page: 2
        });
    };
    SettingPage.prototype.openFeedbackPage = function () {
        this.navCtrl.push(AboutPage, {
            page: 3
        });
    };
    SettingPage.prototype.logout = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Are you sure?',
            subTitle: 'You will need to login again to keep using the application',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Ok',
                    handler: function () {
                        _this.userService.logoutUser().then(function () {
                            window.location.reload();
                            //this.navCtrl.parent.parent.setRoot(SlideStarterPage);
                            console.log("logout");
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    return SettingPage;
}());
SettingPage = __decorate([
    Component({
        selector: 'page-setting',
        templateUrl: 'setting.html',
        providers: [UserService]
    }),
    __metadata("design:paramtypes", [NavController,
        UserService,
        LoadingController,
        AlertController])
], SettingPage);
export { SettingPage };
//# sourceMappingURL=setting.js.map