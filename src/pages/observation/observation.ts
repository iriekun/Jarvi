import { Component } from '@angular/core';
import { ModalController, NavController,ViewController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, Geolocation } from 'ionic-native';
import * as firebase from 'firebase';

import { ObservationService } from '../../providers/observation-service';


//import exif from 'exif';

/*
  Generated class for the Observation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-observation',
  templateUrl: 'observation.html',
  providers: [ObservationService]
})
export class ObservationPage {

  public base64Image: any = null;
  public imageShowOnUi: any;
  public location: any;
  public storageRef: any;
  public latitude: any;
  public longitude: any;
  public detail: any;
  public obs_value : any;
  public date: any;
  public millisecond: any;
  public task_id: any;
  public task_option_name: any;
  public task_options: any;

  obsValues = ["No", "Partial", "Compact"];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public observationService: ObservationService,
    public formBuilder: FormBuilder,
    private navParams: NavParams,
    public alertCtrl: AlertController) {

 //  this.obs_value = this.obsValues[0]; //when no value is selected, the first value in placeholder is recorded
    this.location = "Add location";
    this.storageRef = firebase.storage().ref();
    this.task_id = navParams.get('task_id');
    this.task_option_name = navParams.get('task_option_name');
    this.task_options = navParams.get('task_options');
    this.obs_value = this.task_options[0];
    console.log(this.task_id);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  openGallery(){
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
        console.log(imageData);

        this.imageShowOnUi = "data:image/jpeg;base64," + imageData;
        this.base64Image = imageData;

    }, (err) => {
        console.log(err);
    });
  }
  getLocation(){
      Geolocation.getCurrentPosition().then((resp) => {
       console.log("Latitude: ", resp.coords.latitude);
       console.log("Longitude: ", resp.coords.longitude);
       this.location = "Lat:"+resp.coords.latitude +" Long:"+ resp.coords.longitude;
       this.latitude = resp.coords.latitude;
       this.longitude = resp.coords.longitude;
    });
  }
  takePhoto() {
    Camera.getPicture({ 
      //DATA_URL : retrieve base64 image
      //FILE_URI : retrieve file location
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.imageShowOnUi = "data:image/jpeg;base64," + imageData;
        this.base64Image = imageData;
        console.log(imageData);
   //     this.base64Image = imageData; 

         // exif.getData((imageData) => {
         //     this.location = exif.getTag(imageData, "GPSLongitude");
         //     console.log(imageData);
         //     console.log("location"+ this.location);
         // });

    }, (err) => {
        console.log(err);
    });
  }

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

  submitObservation(){
    console.log("base64" + this.base64Image);
    console.log(this.detail);
    console.log(this.longitude); 
    console.log(this.latitude);
   // this.observationService.recordObservation(this.b64toBlob(this.base64Image, 512), 
       //   this.latitude, this.longitude, this.detail, this.obs_value, this.date.toString(), this.millisecond, this.task_id);
    this.observationService.recordObservation(this.base64Image, this.latitude, this.longitude, 
              this.detail, this.obs_value, this.task_id);
    this.showAlert();
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'CONGRATULATION',
      subTitle: 'You just earn 20 points! Submit more observation to be the top of leaderboard.',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Ok',
          handler: ()=>{
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert.present();
  }
}
