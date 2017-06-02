import { Component } from '@angular/core';
import { ModalController, NavController,ViewController, NavParams, AlertController } from 'ionic-angular';
import { Camera, Geolocation } from 'ionic-native';
import firebase from 'firebase';

import { ObservationService } from '../../providers/observation-service';
import { CongratMessagePage } from '../congrat-message/congrat-message';
import { ObsDetailPage } from '../obs-detail/obs-detail';


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
  public latitude: any;
  public longitude: any;
  public detail: any;
  public obs_value : any;
  public date: any;
  public millisecond: any;
  public task_id: any;
  public task_option_name="Ice Condition";
  public task_options=["No", "Partial", "Compact"];
  public time_start: any;
  public time_end: any;

  databaseRef: any;
  user: any;
  obsValues = ["No", "Partial", "Compact"];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public observationService: ObservationService,
    private navParams: NavParams,
    public alertCtrl: AlertController) {

    this.databaseRef = firebase.database().ref();
    this.user = firebase.auth().currentUser;
    this.obs_value=this.obsValues[0];
    this.task_id = navParams.get('task_id');
    this.latitude = navParams.get('latitude');
    this.longitude = navParams.get('longitude');
    console.log(this.task_id+ this.latitude + this.longitude);
  }

  ionViewDidEnter(){
  //  this.getLocation();
    this.observationService.readSubmissionOpen();
    this.time_start = new Date().getTime();
    console.log(this.task_id+" " +this.latitude +" "+ this.longitude);
  }

  dismiss() {
    this.navCtrl.popToRoot(); 
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
    this.time_end = new Date().getTime();
    console.log("base64" + this.base64Image);
    console.log(this.detail);
    console.log(this.longitude); 
    console.log(this.latitude);
   // this.observationService.recordObservation(this.b64toBlob(this.base64Image, 512), 
       //   this.latitude, this.longitude, this.detail, this.obs_value, this.date.toString(), this.millisecond, this.task_id);
    this.observationService.recordObservation(this.base64Image, this.latitude, this.longitude, 
        this.detail, this.obs_value, this.task_id, this.time_start, this.time_end).then(()=>{
            this.databaseRef.child('/users/'+ this.user.uid).once("value").then((snapshot) =>{
              this.openCongratModal(snapshot.val().user_points, snapshot.val().user_obs);
                console.log(snapshot.val().user_points+"/"+ snapshot.val().user_obs);
            });  
        });   
  }
  openCongratModal(point: any=null, obs: any=null){
    let modal = this.modalCtrl.create(CongratMessagePage, {
      point: point,
      obs: obs
    });
    modal.present();
   // this.navCtrl.popToRoot();
    //this.viewCtrl.dismiss();

  }
    openDetail(){
    this.navCtrl.push(ObsDetailPage);
  }
}
