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
import { Geolocation } from 'ionic-native';
import { Connectivity } from './connectivity';
import { NavController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import 'rxjs/add/operator/map';
var GoogleMaps = (function () {
    function GoogleMaps(connectivityService, navCtrl, loadingCtrl) {
        this.connectivityService = connectivityService;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.mapInitialised = false;
        this.markers = [];
        this.obj = {};
        this.list = [];
        this.databaseRef = firebase.database().ref();
    }
    GoogleMaps.prototype.init = function (mapElement, pleaseConnect) {
        this.mapElement = mapElement;
        this.pleaseConnect = pleaseConnect;
        //   this.apiKey = "AIzaSyClwym4iI8eNQwiwWw81gKstcVbg8mI6Hc";
        return this.loadGoogleMaps();
    };
    GoogleMaps.prototype.loadGoogleMaps = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                console.log("Google maps JavaScript needs to be loaded.");
                _this.disableMap();
                if (_this.connectivityService.isOnline()) {
                    window['mapInit'] = function () {
                        _this.initMap().then(function () {
                            resolve(true);
                        });
                        _this.enableMap();
                    };
                    var script = document.createElement("script");
                    script.id = "googleMaps";
                    if (_this.apiKey) {
                        script.src = 'http://maps.google.com/maps/api/js?key=' + _this.apiKey + '&callback=mapInit';
                    }
                    else {
                        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                    }
                    document.body.appendChild(script);
                }
            }
            else {
                if (_this.connectivityService.isOnline()) {
                    _this.initMap();
                    _this.enableMap();
                }
                else {
                    _this.disableMap();
                }
            }
            _this.addConnectivityListeners();
        });
    };
    GoogleMaps.prototype.initMap = function () {
        var _this = this;
        this.mapInitialised = true;
        return new Promise(function (resolve) {
            Geolocation.getCurrentPosition().then(function (position) {
                // UNCOMMENT FOR NORMAL USE
                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                //  let latLng = new google.maps.LatLng(61.0550, 28.1897); //lat lang of Lappeenranta
                var mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                _this.map = new google.maps.Map(_this.mapElement, mapOptions);
                resolve(true);
                _this.addMarker();
            });
        });
    };
    GoogleMaps.prototype.hello = function () {
        console.log("hello");
    };
    GoogleMaps.prototype.disableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "block";
        }
    };
    GoogleMaps.prototype.enableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "none";
        }
    };
    GoogleMaps.prototype.addConnectivityListeners = function () {
        var _this = this;
        document.addEventListener('online', function () {
            console.log("online");
            setTimeout(function () {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {
                    _this.loadGoogleMaps();
                }
                else {
                    if (!_this.mapInitialised) {
                        _this.initMap();
                    }
                    _this.enableMap();
                }
            }, 2000);
        }, false);
        document.addEventListener('offline', function () {
            console.log("offline");
            _this.disableMap();
        }, false);
    };
    GoogleMaps.prototype.latLng = function () {
        var _this = this;
        return this.databaseRef.child('locations').once("value").then(function (snapshot) {
            snapshot.forEach(function (data) {
                //   console.log("The " + data.key + " score is " + data.val().user_points);
                //   console.log(data.val().user_name);
                _this.getLatLng(data);
            });
        });
        //  this.databaseRef.child('locations').once("value").then((snapshot) =>{
        //   // console.log(snapshot.val());      
        //         snapshot.forEach((data) => {
        //   this.getLatLng(data.val());
        // });
        //  //  console.log(obj)
        //  });  
    };
    GoogleMaps.prototype.getLatLng = function (data) {
        if (data === void 0) { data = null; }
        this.obj[data.key] = data.val();
    };
    GoogleMaps.prototype.addMarker = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
        this.loading.present();
        this.latLng().then(function () {
            _this.loading.dismiss();
            Object.keys(_this.obj).forEach(function (key) {
                console.log(key, _this.obj[key].latitude);
                var latLng = new google.maps.LatLng(_this.obj[key].latitude, _this.obj[key].longitude);
                var marker = new google.maps.Marker({
                    map: _this.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng
                });
                var infoWindow = new google.maps.InfoWindow({
                    content: 'Mission ' + key
                });
                infoWindow.open(_this.map, marker);
                google.maps.event.addListener(marker, 'click', function () {
                    _this.navCtrl.push(_this.page, {
                        task_id: key,
                        latitude: _this.obj[key].latitude,
                        longitude: _this.obj[key].longitude
                    });
                });
            });
        });
        //this.markers.push(marker);  
    };
    GoogleMaps.prototype.test = function () {
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(61.059769, 28.106034)
        });
        var marker2 = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(61.066143, 28.097107)
        });
        var infoWindow = new google.maps.InfoWindow({
            content: ""
        });
        google.maps.event.addListener(marker, 'click', function () {
            //infoWindow.setContent('<button onclick="this.hello()">Click me</button>');
            //infoWindow.open(this.map, marker);
        });
    };
    GoogleMaps.prototype.setPage = function (page) {
        this.page = page;
    };
    return GoogleMaps;
}());
GoogleMaps = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Connectivity, NavController, LoadingController])
], GoogleMaps);
export { GoogleMaps };
//# sourceMappingURL=google-maps.js.map