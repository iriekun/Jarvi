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
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { ObservationService } from '../../providers/observation-service';
import { SlideMissionPage } from '../slide-mission/slide-mission';
var HomePage = (function () {
    function HomePage(navCtrl, observationService) {
        this.navCtrl = navCtrl;
        this.observationService = observationService;
        this.obj = {};
        this.dateArray = [];
        this.taskArray = [];
        this.len = 0;
        this.taskLlist = [];
        this.home = "missions";
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
        this.databaseRef = firebase.database().ref();
        this.user = firebase.auth().currentUser;
    }
    HomePage.prototype.getObj = function (title, subtitle, duedate) {
        if (title === void 0) { title = null; }
        if (subtitle === void 0) { subtitle = null; }
        if (duedate === void 0) { duedate = null; }
        this.task_title = title;
        this.task_subtitle = subtitle;
        this.task_duedate = duedate;
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.databaseRef.child('/tasks/t001').once("value").then(function (snapshot) {
            console.log(snapshot);
            _this.getObj(snapshot.val().task_title, snapshot.val().task_subtitle, snapshot.val().task_duedate);
        });
        this.databaseRef.child('/users/' + this.user.uid).once("value").then(function (snapshot) {
            console.log(_this.user.uid + ":" + snapshot.val().num_visit);
            _this.updateUserVisit(snapshot.val().num_visit);
        });
    };
    HomePage.prototype.updateUserVisit = function (num_visit) {
        if (num_visit === void 0) { num_visit = null; }
        this.databaseRef.child('/users/' + this.user.uid).update({
            num_visit: num_visit + 1,
            last_visit: new Date().toString()
        });
    };
    HomePage.prototype.gotoMission = function (subtitle, optionName, options, stories) {
        console.log("id=" + subtitle);
        this.navCtrl.push(SlideMissionPage, {
            task_name: subtitle,
            task_option_name: optionName,
            task_options: options,
            task_stories: stories
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        providers: [ObservationService]
    }),
    __metadata("design:paramtypes", [NavController, ObservationService])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map