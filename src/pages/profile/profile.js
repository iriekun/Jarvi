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
import { Platform, ActionSheetController } from 'ionic-angular';
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ProfilePage = (function () {
    function ProfilePage(platform, actionsheetCtrl) {
        this.platform = platform;
        this.actionsheetCtrl = actionsheetCtrl;
    }
    ProfilePage.prototype.openMenu = function () {
        var actionSheet = this.actionsheetCtrl.create({
            title: '',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Take Photo ',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: function () {
                        console.log('Delete clicked');
                    }
                },
                {
                    text: 'Choose from Libray ',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: function () {
                        console.log('Delete clicked');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Component({
        selector: 'page-profile',
        templateUrl: 'profile.html'
    }),
    __metadata("design:paramtypes", [Platform,
        ActionSheetController])
], ProfilePage);
export { ProfilePage };
//# sourceMappingURL=profile.js.map