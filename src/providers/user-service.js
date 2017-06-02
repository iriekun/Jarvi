var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { Facebook } from 'ionic-native';
import { NavController, LoadingController } from 'ionic-angular';
import { NgZone } from '@angular/core';
/*
Generated class for the UserService provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
    */
var UserService = (function () {
    function UserService(navCtrl, zone, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.zone = zone;
        this.loadingCtrl = loadingCtrl;
        this.fireAuth = firebase.auth(); //firebase authentication service
        this.userProfile = firebase.database().ref('/users'); //create table named( userProfile
        this.storageRef = firebase.storage().ref(); //create storage reference
        this.databaseRef = firebase.database().ref();
    }
    UserService.prototype.loginFacebook = function (page) {
        var _this = this;
        if (page === void 0) { page = null; }
        Facebook.getLoginStatus().then(function (response) {
            if (response.status === 'connected') {
                Facebook.login(['email']).then(function (response) {
                    var facebookCredential = firebase.auth.FacebookAuthProvider
                        .credential(response.authResponse.accessToken);
                    firebase.auth().signInWithCredential(facebookCredential)
                        .then(function (success) {
                        console.log("Firebase success: " + JSON.stringify(success));
                        _this.zone.run(function () {
                            _this.navCtrl.setRoot(page);
                        });
                    })
                        .catch(function (error) {
                        console.log("Firebase failure: " + JSON.stringify(error));
                    });
                }).catch(function (error) { console.log(error); });
            }
            else {
                Facebook.login(['email']).then(function (response) {
                    var facebookCredential = firebase.auth.FacebookAuthProvider
                        .credential(response.authResponse.accessToken);
                    firebase.auth().signInWithCredential(facebookCredential)
                        .then(function (success) {
                        console.log("Firebase success: " + JSON.stringify(success));
                        _this.databaseRef.child('/users/' + success.uid).set({
                            user_email: success.email,
                            user_name: success.displayName,
                            user_fullname: "",
                            user_photo: success.photoURL,
                            user_join_date: new Date().toString(),
                            user_points: 15,
                            user_obs: 0,
                            user_last_obs: new Date().getTime(),
                            user_submission_open: 0,
                        });
                        _this.zone.run(function () {
                            _this.navCtrl.setRoot(page);
                        });
                    })
                        .catch(function (error) {
                        console.log("Firebase failure: " + JSON.stringify(error));
                    });
                }).catch(function (error) { console.log(error); });
            }
        });
    };
    UserService.prototype.signupUser = function (email, password, username) {
        var _this = this;
        var date = new Date(); //register date
        return this.fireAuth.createUserWithEmailAndPassword(email, password)
            .then(function (newUser) {
            _this.databaseRef.child('/users/' + newUser.uid).set({
                user_email: email,
                user_name: username,
                user_fullname: "",
                user_photo: "https://firebasestorage.googleapis.com/v0/b/jarvigogreen.appspot.com/o/profile%2Favatar.png?alt=media&token=5496a646-17fe-47aa-9d1f-7ea4507c65bc",
                user_join_date: date.toString(),
                user_points: 15,
                user_obs: 0,
                user_last_obs: date.getTime(),
                user_submission_open: 0,
            });
        });
    };
    UserService.prototype.loginUser = function (email, password) {
        return this.fireAuth.signInWithEmailAndPassword(email, password);
    };
    UserService.prototype.resetPasswordUser = function (email) {
        return this.fireAuth.sendPasswordResetEmail(email);
    };
    UserService.prototype.logoutUser = function () {
        return this.fireAuth.signOut();
    };
    UserService.prototype.updateProfileUser = function (image, fullname, username) {
        var _this = this;
        if (image === void 0) { image = null; }
        if (fullname === void 0) { fullname = null; }
        if (username === void 0) { username = null; }
        if (image != null) {
            this.storageRef.child('profile/' + this.fireAuth.currentUser.uid).putString(image, 'base64', { contentType: 'image/JPEG' }).
                then(function (savedImage) {
                _this.userProfile.child(_this.fireAuth.currentUser.uid).update({
                    user_fullname: fullname,
                    user_name: username,
                    user_photo: savedImage.downloadURL
                });
            });
        }
        else {
            this.userProfile.child(this.fireAuth.currentUser.uid).update({
                user_fullname: fullname,
                user_name: username
            });
        }
    };
    return UserService;
}());
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NavController,
        NgZone,
        LoadingController])
], UserService);
export { UserService };
//# sourceMappingURL=user-service.js.map