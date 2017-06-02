import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMaps } from '../../providers/google-maps';
import { Connectivity } from '../../providers/connectivity';
import { NavController, Platform, LoadingController, AlertController } from 'ionic-angular';
import { ObservationPage } from '../observation/observation';
import firebase from 'firebase';
/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [GoogleMaps, Connectivity]

})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
   
   databaseRef : any; 
   user: any;
   loading: any;
   lat: any;
   lng: any;
   key: any;

  constructor(public navCtrl: NavController, 
    public maps: GoogleMaps, 
    public platform: Platform, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
) {
      this.databaseRef = firebase.database().ref();
      this.user = firebase.auth().currentUser;
 
  }

   ionViewDidLoad(){
      this.maps.setPage(ObservationPage);

    this.loading = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loading.present();  
     this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);

   }
   addNewPoint(){
     this.lat = this.maps.getLat();
     this.lng = this.maps.getLng();
     if(this.lat==null || this.lng==null){
       this.presentAlert();
     }
     else{
        this.presentConfirm();
     }
   }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'New Spot',
      subTitle: 'Click on map to add new observation point',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'New Spot',
      message: 'Are you sure you want to add this new observation point there?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Buy clicked');
            let randomId = Math.floor((Math.random() * 100000) + 1);
            let location ={};
            location[randomId] = {              
              latitude: this.lat,
              longitude: this.lng
            }
            
           // update central db that store location
           this.databaseRef.child('/locations/').update(location);
           // update db location of all users
            this.databaseRef.child('/missions/').once('value').then((snapshot) =>{
              snapshot.forEach((data) =>{
                  console.log(data.key);
                  this.databaseRef.child('/missions/'+data.key).update(location);
              });
            }).then(() =>{
              this.ionViewDidLoad();
            });

          }
        }
      ]
    });
    alert.present();
  }  
}
