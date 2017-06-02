import { Injectable } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { Connectivity } from './connectivity';
import { NavController, LoadingController, ModalController, AlertController } from 'ionic-angular';
import firebase from 'firebase';


import 'rxjs/add/operator/map';


/*
  Generated class for the GoogleMaps provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var google;

@Injectable()

export class GoogleMaps {
	mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string;
  marker: any=null;
  latitude: any;
  longitude: any;
  location: any;


  obsPage: any;
  databaseRef: any;
  user: any;
  obj={};
  list=[];
  loading: any;

  constructor(public connectivityService: Connectivity, 
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

           this.databaseRef = firebase.database().ref();
           this.user = firebase.auth().currentUser;

  }
  init(mapElement: any, pleaseConnect: any): Promise<any> {
 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
 //   this.apiKey = "AIzaSyClwym4iI8eNQwiwWw81gKstcVbg8mI6Hc";
 
    return this.loadGoogleMaps();
 
  }
  loadGoogleMaps(): Promise<any> {
 
    return new Promise((resolve) => {
 
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();
 
        if(this.connectivityService.isOnline()){
 
          window['mapInit'] = () => {
 
            this.initMap().then(() => {
              resolve(true);
            });
 
            this.enableMap();
          }
 
          let script = document.createElement("script");
          script.id = "googleMaps";
 
          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
          }
 
          document.body.appendChild(script);  
 
        } 
      }
      else {
 
        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }
 
      }
 
      this.addConnectivityListeners();
 
    });
 
  }
   initMap(): Promise<any> {
 
    this.mapInitialised = true;
 
    return new Promise((resolve) => {
 
      Geolocation.getCurrentPosition().then((position) => {
 
        // UNCOMMENT FOR NORMAL USE
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      //  let latLng = new google.maps.LatLng(61.0550, 28.1897); //lat lang of Lappeenranta
 
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);
        this.addMarker();
        google.maps.event.addListener(this.map, 'click', (event) => {
          if(this.marker!=null){
            this.marker.setMap(null);

          }
          this.latitude = event.latLng.lat();
          this.longitude = event.latLng.lng();
          console.log(this.latitude + ', ' + this.longitude );
          this.marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: event.latLng,
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          });
          let geocoder = new google.maps.Geocoder;
          geocoder.geocode({'location': event.latLng}, (results, status) => {
            if (status === 'OK') {
              if (results[1]) {
                this.location = results[1].formatted_address;
                console.log(this.location);
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
        });;
      });
 
      });
 
    });
 
  }
  hello(){
    console.log("hello");
  }
  disableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
 
  }
 
  enableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
 
  }
 
  addConnectivityListeners(): void {
 
    document.addEventListener('online', () => {
 
      console.log("online");
 
      setTimeout(() => {
 
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        } 
        else {
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
 
      }, 2000);
 
    }, false);
 
    document.addEventListener('offline', () => {
 
      console.log("offline");
 
      this.disableMap();
 
    }, false);
 
  }
  latLng(){
    return this.databaseRef.child('/missions/'+this.user.uid).once("value").then((snapshot) =>{
      snapshot.forEach((data) => {

         this.getLatLng(data);
      });
    });
   //  this.databaseRef.child('locations').once("value").then((snapshot) =>{
   //   // console.log(snapshot.val());      
   //         snapshot.forEach((data) => {

   //   this.getLatLng(data.val());
   // });
   //  //  console.log(obj)
   //  });  
  }
  getLatLng(data: any = null): any{
        this.obj[data.key] = data.val();
  }
  addMarker(): void {
    this.loading = this.loadingCtrl.create({
         content: "Please wait..."
    });
    this.loading.present();
    this.latLng().then(() =>{
      this.loading.dismiss();
      Object.keys(this.obj).forEach((key) =>{
          console.log(this.obj);
          console.log(key, this.obj[key].latitude);
          let latLng = new google.maps.LatLng(this.obj[key].latitude, this.obj[key].longitude);
          let marker;
           
          if(this.obj[key].state=="done"){ //if state = new -> marker red
             marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: latLng,
                icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            });
             
            
          }else{ //if state = done -> marker green
            marker = new google.maps.Marker({
              map: this.map,
              animation: google.maps.Animation.DROP,
              position: latLng
            });
            
          }             
        google.maps.event.addListener(marker, 'click', () => {
          console.log(key);

          this.navCtrl.push(this.obsPage,{
            task_id: key,
            latitude: this.obj[key].latitude,
            longitude: this.obj[key].longitude,
            desc: this.obj[key].desc,
            name: this.obj[key].name
          });
          // let modal = this.modalCtrl.create(this.page, {
          //   task_id: key,
          //   latitude: this.obj[key].latitude,
          //   longitude: this.obj[key].longitude,
          //   desc: this.obj[key].desc,
          //   name: this.obj[key].name
          // });
          // modal.present();
          
        });
      });
   
    }); 
     
    //this.markers.push(marker);  
  }
  setPage(obsPage: any=null){
      this.obsPage = obsPage;
  }
  getLat(){
    return this.latitude;
  }
  getLng(){
    return this.longitude;
  }
 


}
