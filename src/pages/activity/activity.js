var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Chart } from 'chart.js';
/*
  Generated class for the Activity page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ActivityPage = (function () {
    function ActivityPage(loadingCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.obj1 = {};
        this.obj2 = {};
        this.obj3 = {};
        this.databaseRef = firebase.database().ref();
    }
    ActivityPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
        this.loading.present();
        this.getRecord().then(function () {
            _this.loading.dismiss();
            var length = Object.keys(_this.obj1).length +
                _this.doughnutChart;
            new Chart(_this.doughnutCanvas.nativeElement, {
                type: 'doughnut',
                data: {
                    labels: ["Compact", "Partial", "No"],
                    datasets: [{
                            label: '# of Votes',
                            data: [Object.keys(_this.obj1).length, Object.keys(_this.obj1).length, Object.keys(_this.obj3).length],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)'
                            ],
                            hoverBackgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56"
                            ]
                        }]
                }
            });
        });
    };
    ActivityPage.prototype.getRecord = function () {
        var _this = this;
        return this.databaseRef.child('/observations/').orderByChild('obs_value').once("value").then(function (snapshot) {
            snapshot.forEach(function (data) {
                if (data.val().obs_value == "Compact") {
                    _this.getRecordValue1(data);
                }
                else if (data.val().obs_value == "Partial") {
                    _this.getRecordValue2(data);
                }
                else {
                    _this.getRecordValue3(data);
                }
            });
        });
    };
    ActivityPage.prototype.getRecordValue1 = function (data) {
        if (data === void 0) { data = null; }
        this.obj1[data.key] = data.val();
    };
    ActivityPage.prototype.getRecordValue2 = function (data) {
        if (data === void 0) { data = null; }
        this.obj2[data.key] = data.val();
    };
    ActivityPage.prototype.getRecordValue3 = function (data) {
        if (data === void 0) { data = null; }
        this.obj3[data.key] = data.val();
    };
    return ActivityPage;
}());
__decorate([
    ViewChild('doughnutCanvas'),
    __metadata("design:type", Object)
], ActivityPage.prototype, "doughnutCanvas", void 0);
ActivityPage = __decorate([
    Component({
        selector: 'page-activity',
        templateUrl: 'activity.html'
    }),
    __metadata("design:paramtypes", [LoadingController])
], ActivityPage);
export { ActivityPage };
//# sourceMappingURL=activity.js.map