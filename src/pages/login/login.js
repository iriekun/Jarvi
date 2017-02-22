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
import { ModalController, NavController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../providers/user-service';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
var LoginPage = (function () {
    function LoginPage(navCtrl, viewCtrl, modalCtrl, userService, formBuilder, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.submitAttempt = false;
        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }
    LoginPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    LoginPage.prototype.openModalResetPwd = function () {
        this.dismiss();
        var modal = this.modalCtrl.create(ResetPasswordPage);
        modal.present();
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
        else {
            this.userService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(function () {
                _this.navCtrl.push(TabsPage);
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
            this.loading = this.loadingCtrl.create({
                dismissOnPageChange: true,
            });
            this.loading.present();
        }
    };
    LoginPage.prototype.openModalSignup = function () {
        this.dismiss();
        var modal = this.modalCtrl.create(SignupPage);
        modal.present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
        providers: [UserService]
    }),
    __metadata("design:paramtypes", [NavController,
        ViewController,
        ModalController,
        UserService,
        FormBuilder,
        LoadingController,
        AlertController])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map