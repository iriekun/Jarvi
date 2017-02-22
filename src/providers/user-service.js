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
/*
Generated class for the UserService provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
    */
var UserService = (function () {
    function UserService() {
        this.fireAuth = firebase.auth(); //firebase authentication service
        this.userProfile = firebase.database().ref('/userProfile'); //create table named userProfile
    }
    UserService.prototype.signupUser = function (email, password, firstname, lastname) {
        var _this = this;
        var date = new Date(); //register date
        return this.fireAuth.createUserWithEmailAndPassword(email, password)
            .then(function (newUser) {
            _this.userProfile.child(newUser.uid).set({
                u_email: email,
                u_firstname: firstname,
                u_lastname: lastname,
                u_join_date: date.toString()
            });
        });
    };
    UserService.prototype.loginUser = function (email, password) {
        return this.fireAuth.signInWithEmailAndPassword(email, password);
    };
    UserService.prototype.resetPasswordUser = function (email) {
        return this.fireAuth.sendPasswordResetEmail(email);
    };
    return UserService;
}());
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], UserService);
export { UserService };
//# sourceMappingURL=user-service.js.map