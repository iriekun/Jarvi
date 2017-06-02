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
import { Platform, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { ObservationPage } from '../observation/observation';
import { InAppBrowser } from 'ionic-native';
/*
  Generated class for the SlideMission page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SlideMissionPage = (function () {
    function SlideMissionPage(platform, navCtrl, viewCtrl, modalCtrl, navParams) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.tasks = [
            {
                id: "task_1",
                missionNum: "Mission 001",
                name: "Ice Condition",
                image: "assets/img/bg1.jpg",
                desc: "",
                dueDate: "30 March 2017",
                optionName: "Ice Cover",
                options: ["No", "Partial", "Compact"],
                stories: ["assets/img/s1.png", "assets/img/s2.png", "assets/img/s3.png", "assets/img/s4.png", "assets/img/s5.png",
                    "assets/img/s6.png", "assets/img/s7.png"]
            },
        ];
        // this.task_stories = navParams.get('task_stories');
        // this.task_option_name = navParams.get('task_option_name');
        // this.task_options = navParams.get('task_options');
        // this.task_name = navParams.get('task_name');
        this.task_stories = this.tasks[0].stories;
        this.task_name = this.tasks[0].name;
        this.task_id = navParams.get('task_id');
        this.lat = navParams.get('latitude');
        this.lng = navParams.get('longitude');
        console.log(this.lat);
    }
    SlideMissionPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SlideMissionPage.prototype.openModalObservationPage = function () {
        this.dismiss();
        var modal = this.modalCtrl.create(ObservationPage, {
            // task_name: this.task_name,
            // task_option_name: this.task_option_name,
            // task_options: this.task_options,
            task_id: this.task_id,
            latitude: this.lat,
            longitude: this.lng
        });
        modal.present();
    };
    SlideMissionPage.prototype.skip = function (slide) {
        slide.slideTo(this.task_stories.length + 1);
    };
    SlideMissionPage.prototype.openLink = function () {
        var browser = new InAppBrowser('https://ionic.io', '_system', "location=yes");
        browser.show();
    };
    SlideMissionPage.prototype.return = function () {
        this.navCtrl.pop();
    };
    return SlideMissionPage;
}());
SlideMissionPage = __decorate([
    Component({
        selector: 'page-slide-mission',
        templateUrl: 'slide-mission.html'
    }),
    __metadata("design:paramtypes", [Platform,
        NavController,
        ViewController,
        ModalController,
        NavParams])
], SlideMissionPage);
export { SlideMissionPage };
//# sourceMappingURL=slide-mission.js.map