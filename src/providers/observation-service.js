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
  Generated class for the ObservationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ObservationService = (function () {
    function ObservationService() {
        this.storageRef = firebase.storage().ref(); //create storage reference
        this.user = firebase.auth().currentUser;
        this.databaseRef = firebase.database().ref();
    }
    // recordPoints(username: any = null, photo: any = null, point: any = null): any{
    // 	let foo = {};
    // 	let key = this.user.uid;
    // 	foo[key] = point+20; 
    // 	this.databaseRef.child('/points/').update(foo);
    // }
    ObservationService.prototype.readSubmissionOpen = function () {
        var _this = this;
        this.databaseRef.child('/users/' + this.user.uid).once("value").then(function (snapshot) {
            _this.UpdateSubmissionOpen(snapshot.val().user_submission_open);
        });
    };
    ObservationService.prototype.UpdateSubmissionOpen = function (open) {
        if (open === void 0) { open = null; }
        this.databaseRef.child('/users/' + this.user.uid).update({
            user_submission_open: open + 1
        });
    };
    ObservationService.prototype.readPoints = function () {
        var _this = this;
        this.databaseRef.child('/users/' + this.user.uid).once("value").then(function (snapshot) {
            //	this.getPoints(snapshot.val().user_points);
            _this.updateProfile(snapshot.val().user_points, snapshot.val().user_obs);
            //	this.recordPoints(snapshot.val().user_name, snapshot.val().user_photo, snapshot.val().user_points);
        });
    };
    ObservationService.prototype.updateProfile = function (point, obs) {
        if (point === void 0) { point = null; }
        if (obs === void 0) { obs = null; }
        //this.points = this.readPoints();	
        this.databaseRef.child('/users/' + this.user.uid).update({
            user_points: point + 20,
            user_obs: obs + 1,
            user_last_obs: new Date().getTime()
        });
    };
    ObservationService.prototype.recordObservation = function (image, latitude, longitude, detail, obs_value, task_name, time_start, time_end) {
        var _this = this;
        if (image === void 0) { image = null; }
        if (latitude === void 0) { latitude = null; }
        if (longitude === void 0) { longitude = null; }
        if (detail === void 0) { detail = null; }
        if (obs_value === void 0) { obs_value = null; }
        if (task_name === void 0) { task_name = null; }
        if (time_start === void 0) { time_start = null; }
        if (time_end === void 0) { time_end = null; }
        var date = new Date();
        var randomId = Math.floor((Math.random() * 100000) + 1);
        var value = task_name + "-" + obs_value;
        var foo = {};
        var time_complete = time_end - time_start;
        foo[date.toString()] = value;
        if (image != null) {
            // this.storageRef.child('images/img_'+ randomId).put(image).then((savedImage) => {
            // this.observation.child('obs_'+randomId).set({
            this.storageRef.child('images/img_' + randomId).putString(image, 'base64', { contentType: 'image/JPEG' }).
                then(function (savedImage) {
                _this.databaseRef.child('/observations/obs_' + randomId).update({
                    user_id: _this.user.uid,
                    task_name: task_name,
                    obs_img_url: savedImage.downloadURL,
                    obs_latitude: latitude,
                    obs_longitude: longitude,
                    obs_detail: detail,
                    obs_value: obs_value,
                    obs_date: date.toString(),
                    time_complete: time_complete
                });
                _this.databaseRef.child('/history/' + _this.user.uid).update(foo);
                _this.readPoints();
            });
        }
        else {
            this.databaseRef.child('/observations/obs_' + randomId).update({
                user_id: this.user.uid,
                task_name: task_name,
                obs_latitude: latitude,
                obs_longitude: longitude,
                obs_detail: detail,
                obs_value: obs_value,
                obs_date: date.toString(),
                time_complete: time_complete
            });
            this.databaseRef.child('/history/' + this.user.uid).update(foo);
            this.readPoints(); //read user_points value from db & update points
        }
    };
    return ObservationService;
}());
ObservationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], ObservationService);
export { ObservationService };
//# sourceMappingURL=observation-service.js.map