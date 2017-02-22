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
import { ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { ObservationPage } from '../observation/observation';
/*
  Generated class for the SlideMission page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SlideMissionPage = (function () {
    function SlideMissionPage(navCtrl, viewCtrl, modalCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        //@ViewChild(Slides) slides: Slides;
        this.slides = [
            {
                image: "assets/img/story1.png"
            },
            {
                image: "assets/img/story2.png"
            }
        ];
        this.task_id = navParams.get('task_id');
    }
    SlideMissionPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SlideMissionPage.prototype.openModalObservationPage = function () {
        this.dismiss();
        var modal = this.modalCtrl.create(ObservationPage, { task_id: this.task_id });
        modal.present();
    };
    return SlideMissionPage;
}());
SlideMissionPage = __decorate([
    Component({
        selector: 'page-slide-mission',
        templateUrl: 'slide-mission.html'
    }),
    __metadata("design:paramtypes", [NavController,
        ViewController,
        ModalController,
        NavParams])
], SlideMissionPage);
export { SlideMissionPage };
//# sourceMappingURL=slide-mission.js.map