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
import { Platform, ActionSheetController, ViewController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { UserService } from '../../providers/user-service';
import * as firebase from 'firebase';
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ProfilePage = (function () {
    function ProfilePage(platform, actionsheetCtrl, viewCtrl, userService) {
        this.platform = platform;
        this.actionsheetCtrl = actionsheetCtrl;
        this.viewCtrl = viewCtrl;
        this.userService = userService;
        this.base64Image = null;
        this.imageShowOnUi = "";
        this.databaseRef = firebase.database().ref();
        this.user = firebase.auth().currentUser;
        this.fullname = "";
        this.username = "";
        this.imageShowOnUi = "assets/img/avatar.png";
    }
    ProfilePage.prototype.ionViewDidEnter = function () {
        this.userData();
    };
    ProfilePage.prototype.openMenu = function () {
        var _this = this;
        var actionSheet = this.actionsheetCtrl.create({
            title: '',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Take Photo ',
                    icon: !this.platform.is('ios') ? 'md-camera' : null,
                    handler: function () {
                        console.log('Delete clicked');
                        _this.takePhoto();
                    }
                },
                {
                    text: 'Choose from Libray ',
                    icon: !this.platform.is('ios') ? 'md-image' : null,
                    handler: function () {
                        console.log('Delete clicked');
                        _this.openGallery();
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
    ProfilePage.prototype.takePhoto = function () {
        var _this = this;
        Camera.getPicture({
            //DATA_URL : retrieve base64 image
            //FILE_URI : retrieve file location
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then(function (imageData) {
            // imageData is a base64 encoded string
            _this.imageShowOnUi = "data:image/jpeg;base64," + imageData;
            _this.base64Image = imageData;
            console.log(imageData);
            //     this.base64Image = imageData; 
            // exif.getData((imageData) => {
            //     this.location = exif.getTag(imageData, "GPSLongitude");
            //     console.log(imageData);
            //     console.log("location"+ this.location);
            // });
        }, function (err) {
            console.log(err);
        });
    };
    ProfilePage.prototype.openGallery = function () {
        var _this = this;
        Camera.getPicture({
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then(function (imageData) {
            console.log(imageData);
            _this.imageShowOnUi = "data:image/jpeg;base64," + imageData;
            _this.base64Image = imageData;
        }, function (err) {
            console.log(err);
        });
    };
    ProfilePage.prototype.updateProfile = function () {
        this.userService.updateProfileUser(this.base64Image, this.fullname, this.username);
        this.viewCtrl.dismiss();
    };
    ProfilePage.prototype.userData = function () {
        var _this = this;
        this.databaseRef.child('/users/' + this.user.uid).once("value").then(function (snapshot) {
            //  this.getPoints(snapshot.val().user_points);
            _this.getUserData(snapshot.val().user_fullname, snapshot.val().user_name, snapshot.val().user_photo);
        });
    };
    ProfilePage.prototype.getUserData = function (fullname, username, photo) {
        if (fullname === void 0) { fullname = null; }
        if (username === void 0) { username = null; }
        if (photo === void 0) { photo = null; }
        this.fullname = fullname;
        this.username = username;
        this.imageShowOnUi = photo;
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Component({
        selector: 'page-profile',
        templateUrl: 'profile.html',
        providers: [UserService]
    }),
    __metadata("design:paramtypes", [Platform,
        ActionSheetController,
        ViewController,
        UserService])
], ProfilePage);
export { ProfilePage };
//# sourceMappingURL=profile.js.map