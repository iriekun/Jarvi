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
        this.observation = firebase.database().ref('/observation');
        this.storageRef = firebase.storage().ref(); //create storage reference
        this.user = firebase.auth().currentUser;
    }
    ObservationService.prototype.recordObservation = function (image, latitude, longitude, detail, obs_value, task_id) {
        var _this = this;
        if (image === void 0) { image = null; }
        if (latitude === void 0) { latitude = null; }
        if (longitude === void 0) { longitude = null; }
        if (detail === void 0) { detail = null; }
        if (obs_value === void 0) { obs_value = null; }
        if (task_id === void 0) { task_id = null; }
        var date = new Date();
        var randomId = Math.floor((Math.random() * 100000) + 1);
        if (image != null) {
            // this.storageRef.child('images/img_'+ randomId).put(image).then((savedImage) => {
            // this.observation.child('obs_'+randomId).set({
            this.storageRef.child('images/img_' + randomId).putString(image, 'base64', { contentType: 'image/JPEG' }).
                then(function (savedImage) {
                _this.observation.child('obs_' + randomId).set({
                    //uid : this.user.uid,
                    task_id: task_id,
                    obs_img_url: savedImage.downloadURL,
                    obs_latitude: latitude,
                    obs_longitude: longitude,
                    obs_detail: detail,
                    obs_value: obs_value,
                    obs_date: date.toString(),
                    obs_millisecond: date.getTime()
                });
            });
        }
        else {
            this.observation.child('obs_' + randomId).set({
                //uid : this.user.uid,
                task_id: task_id,
                obs_latitude: latitude,
                obs_longitude: longitude,
                obs_detail: detail,
                obs_value: obs_value,
                obs_date: date.toString(),
                obs_millisecond: date.getTime()
            });
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