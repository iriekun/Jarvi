import { Component } from '@angular/core';
import { Platform, ActionSheetController, ViewController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { UserService } from '../../providers/user-service';
import * as firebase from 'firebase';



/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
    providers: [UserService]

})
export class ProfilePage {
    public base64Image: any = null;
    public imageShowOnUi: any="";
    public firstname: any;
    public lastname: any;
    public databaseRef: any;
    public user: any;


  constructor( 
  	public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public viewCtrl: ViewController,
    public userService: UserService
  ) {
    this.databaseRef = firebase.database().ref();
    this.user = firebase.auth().currentUser;
    this.firstname="";
    this.lastname="";
    this.imageShowOnUi="assets/img/avatar.png"
  }
  ionViewDidEnter() {
    this.userData();
  }
  openMenu(){
  	 let actionSheet = this.actionsheetCtrl.create({
      title: '',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Take Photo ',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
            this.takePhoto();
          }
        },
        {
          text: 'Choose from Libray ',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
            this.openGallery();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
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
  updateProfile(){
    this.userService.updateProfileUser(this.base64Image, this.firstname, this.lastname);
    this.viewCtrl.dismiss();
  }
  userData(): any{
    this.databaseRef.child('/users/'+ this.user.uid).once("value").then((snapshot) =>{
    //  this.getPoints(snapshot.val().user_points);
      this.getUserData(snapshot.val().user_firstname, snapshot.val().user_lastname, snapshot.val().user_photo);
    });  
  }
  getUserData(firstname: any = null, lastname: any=null, photo: any=null): any{
    this.firstname = firstname;
    this.lastname = lastname;
    this.imageShowOnUi = photo;
  }

}
