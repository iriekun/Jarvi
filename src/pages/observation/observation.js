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
import { ModalController, NavController, ViewController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Camera, Geolocation } from 'ionic-native';
import * as firebase from 'firebase';
import { ObservationService } from '../../providers/observation-service';
//import exif from 'exif';
/*
  Generated class for the Observation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ObservationPage = (function () {
    function ObservationPage(navCtrl, viewCtrl, modalCtrl, observationService, formBuilder, navParams, alertCtrl) {
        // this.submitObsForm = formBuilder.group({
        //     detail: ['', Validators.compose([Validators.required])],
        //   });
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.observationService = observationService;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.base64Image = null;
        this.location = "Add location";
        this.storageRef = firebase.storage().ref();
        this.task_id = navParams.get('task_id');
        console.log(this.task_id);
    }
    ObservationPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ObservationPage.prototype.openGallery = function () {
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
    ObservationPage.prototype.getLocation = function () {
        var _this = this;
        Geolocation.getCurrentPosition().then(function (resp) {
            console.log("Latitude: ", resp.coords.latitude);
            console.log("Longitude: ", resp.coords.longitude);
            _this.location = "Lat:" + resp.coords.latitude + " Long:" + resp.coords.longitude;
            _this.latitude = resp.coords.latitude;
            _this.longitude = resp.coords.longitude;
        });
    };
    ObservationPage.prototype.takePhoto = function () {
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
    // b64toBlob(b64Data,  sliceSize) {
    //   sliceSize = sliceSize || 512;
    //   var byteCharacters = atob(b64Data);
    //   var byteArrays = [];
    //   for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    //     var slice = byteCharacters.slice(offset, offset + sliceSize);
    //     var byteNumbers = new Array(slice.length);
    //     for (var i = 0; i < slice.length; i++) {
    //       byteNumbers[i] = slice.charCodeAt(i);
    //     }
    //     var byteArray = new Uint8Array(byteNumbers);
    //     byteArrays.push(byteArray);
    //   }
    //   let blob
    //   blob = new Blob(byteArrays, {type:"image/png"});
    //   // var url = URL.createObjectURL(blob);
    //   return blob;
    // }
    ObservationPage.prototype.submitObservation = function () {
        console.log("base64" + this.base64Image);
        console.log(this.detail);
        console.log(this.longitude);
        console.log(this.latitude);
        // this.observationService.recordObservation(this.b64toBlob(this.base64Image, 512), 
        //   this.latitude, this.longitude, this.detail, this.obs_value, this.date.toString(), this.millisecond, this.task_id);
        this.observationService.recordObservation(this.base64Image, this.latitude, this.longitude, this.detail, this.obs_value, this.task_id);
        this.showAlert();
        this.dismiss();
    };
    ObservationPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'CONGRATULATION',
            subTitle: 'You just earn 10 points! Submit more observation to be the top of leaderboard.',
            buttons: ['OK']
        });
        alert.present();
    };
    return ObservationPage;
}());
ObservationPage = __decorate([
    Component({
        selector: 'page-observation',
        templateUrl: 'observation.html',
        providers: [ObservationService]
    }),
    __metadata("design:paramtypes", [NavController,
        ViewController,
        ModalController,
        ObservationService,
        FormBuilder,
        NavParams,
        AlertController])
], ObservationPage);
export { ObservationPage };
//# sourceMappingURL=observation.js.map