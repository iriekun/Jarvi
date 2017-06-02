var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
/*
  Generated class for the Leaderboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var LeaderboardPage = (function () {
    function LeaderboardPage(navCtrl, navParams, loadingCtrl, zone) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.zone = zone;
        this.obj = {}; //name:point 
        this.len = 0;
        this.leaderboardList = [];
        this.dateArray = [];
        this.taskArray = [];
        this.objActivity = {};
        this.range = function (value) {
            var a = [];
            for (var i = 0; i < value; ++i) {
                a.push(i);
            }
            return a;
        };
        this.databaseRef = firebase.database().ref();
        this.user = firebase.auth().currentUser;
        this.ranking = "leaderboard"; //initilize segment
    }
    LeaderboardPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
        this.loading.present();
        this.leaderboard().then(function () {
            _this.loading.dismiss();
            _this.leaderboardList = Object.keys(_this.obj).map(function (key) { return _this.obj[key]; }); //return value
            //console.log(this.leaderboardList);
            _this.leaderboardList.reverse().forEach(function (item) {
                //console.log(item.user_name);
            });
        });
        this.loadActivity();
    };
    LeaderboardPage.prototype.getOrderedPoint = function (data) {
        if (data === void 0) { data = null; }
        this.obj[data.key] = data.val();
        // this.leaderboardList.push({
        //  			name:data.val().user_name,
        //  			point:data.val().user_points,
        //  			photo:data.val().user_photo
        // });		
    };
    LeaderboardPage.prototype.leaderboard = function () {
        var _this = this;
        return this.databaseRef.child('/users/').orderByChild('user_points').limitToLast(10).once("value").then(function (snapshot) {
            snapshot.forEach(function (data) {
                //   console.log("The " + data.key + " score is " + data.val().user_points);
                //   console.log(data.val().user_name);
                _this.getOrderedPoint(data);
            });
        });
    };
    LeaderboardPage.prototype.userData = function () {
        var _this = this;
        this.databaseRef.child('/users/' + this.user.uid).once("value").then(function (snapshot) {
            //	this.getPoints(snapshot.val().user_points);
            _this.getUserData(snapshot.val().user_points, snapshot.val().user_obs, snapshot.val().user_last_obs);
        });
    };
    LeaderboardPage.prototype.getUserData = function (point, obs, ms_obs) {
        if (point === void 0) { point = null; }
        if (obs === void 0) { obs = null; }
        if (ms_obs === void 0) { ms_obs = null; }
        var date = new Date().getTime();
        this.total_obs = obs;
        //calculate punishment point 1 day -5pt
        this.nDay = Math.floor((date - ms_obs) / 86400000);
        console.log(this.nDay);
        if (this.nDay > 0) {
            var pt = point - (5 * this.nDay);
            if (pt < 0) {
                this.total_point = 0;
            }
            else {
                this.total_point = pt;
            }
        }
        else {
            this.total_point = point;
        }
        this.databaseRef.child('/users/' + this.user.uid).update({
            user_points: this.total_point
        });
    };
    LeaderboardPage.prototype.historyData = function () {
        var _this = this;
        this.databaseRef.child('/history/' + this.user.uid).limitToLast(10).once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                //   console.log("The " + data.key + " score is " + data.val());
                _this.getHistoryData(data);
            });
        });
    };
    LeaderboardPage.prototype.getHistoryData = function (data) {
        if (data === void 0) { data = null; }
        this.objActivity[data.key] = data.val();
    };
    LeaderboardPage.prototype.loadActivity = function () {
        var _this = this;
        this.userData();
        this.historyData();
        console.log(this.objActivity);
        this.taskArray = Object.keys(this.objActivity).map(function (key) { return _this.objActivity[key]; }); //return value
        this.taskArray.reverse();
        this.dateArray = Object.keys(this.objActivity); //return key
        this.dateArray.reverse();
        if (this.taskArray.length > 0) {
            this.len = this.taskArray.length;
        }
    };
    return LeaderboardPage;
}());
LeaderboardPage = __decorate([
    Component({
        selector: 'page-leaderboard',
        templateUrl: 'leaderboard.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        LoadingController,
        NgZone])
], LeaderboardPage);
export { LeaderboardPage };
//# sourceMappingURL=leaderboard.js.map