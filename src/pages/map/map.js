var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Locations } from '../../providers/locations';
import { GoogleMaps } from '../../providers/google-maps';
import { Connectivity } from '../../providers/connectivity';
import { NavController, Platform, LoadingController } from 'ionic-angular';
import { SlideMissionPage } from '../slide-mission/slide-mission';
/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MapPage = (function () {
    function MapPage(navCtrl, maps, platform, locations, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.maps = maps;
        this.platform = platform;
        this.locations = locations;
        this.loadingCtrl = loadingCtrl;
    }
    MapPage.prototype.ionViewDidLoad = function () {
        this.maps.setPage(SlideMissionPage);
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 5000
        });
        this.loading.present();
        this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
    };
    return MapPage;
}());
__decorate([
    ViewChild('map'),
    __metadata("design:type", ElementRef)
], MapPage.prototype, "mapElement", void 0);
__decorate([
    ViewChild('pleaseConnect'),
    __metadata("design:type", ElementRef)
], MapPage.prototype, "pleaseConnect", void 0);
MapPage = __decorate([
    Component({
        selector: 'page-map',
        templateUrl: 'map.html',
        providers: [GoogleMaps, Locations, Connectivity]
    }),
    __metadata("design:paramtypes", [NavController,
        GoogleMaps,
        Platform,
        Locations,
        LoadingController])
], MapPage);
export { MapPage };
//# sourceMappingURL=map.js.map