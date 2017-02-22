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
/*
  Generated class for the ResetPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ResetPasswordPage = (function () {
    function ResetPasswordPage(navCtrl, viewCtrl, modalCtrl, userService, formBuilder, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.submitAttempt = false;
        this.resetPasswordForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required])]
        });
    }
    ResetPasswordPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ResetPasswordPage.prototype.resetPassword = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.resetPasswordForm.valid) {
            console.log(this.resetPasswordForm.value);
        }
        else {
            this.userService.resetPasswordUser(this.resetPasswordForm.value.email).then(function (user) {
                var alert = _this.alertCtrl.create({
                    message: "We just sent you a reset link to your email",
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel',
                            handler: function () {
                                _this.navCtrl.pop();
                            }
                        }
                    ]
                });
                alert.present();
            }, function (error) {
                var errorMessage = error.message;
                var errorAlert = _this.alertCtrl.create({
                    message: errorMessage,
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                errorAlert.present();
            });
        }
    };
    return ResetPasswordPage;
}());
ResetPasswordPage = __decorate([
    Component({
        selector: 'page-reset-password',
        templateUrl: 'reset-password.html',
        providers: [UserService]
    }),
    __metadata("design:paramtypes", [NavController,
        ViewController,
        ModalController,
        UserService,
        FormBuilder,
        LoadingController,
        AlertController])
], ResetPasswordPage);
export { ResetPasswordPage };
//# sourceMappingURL=reset-password.js.map