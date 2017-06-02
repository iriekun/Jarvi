import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { Facebook } from 'ionic-native';
import { NavController, LoadingController } from 'ionic-angular';
import { NgZone } from '@angular/core';





/*
Generated class for the UserService provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
	*/
@Injectable()
export class UserService {

	// constructor(public http: Http) {
		//   console.log('Hello UserService Provider');
		// }
		public fireAuth: any;
		public userProfile: any;
		public storageRef: any;
		public databaseRef: any;
		public userId: any;
		public id: any;
		loading: any;

		constructor( 
			public navCtrl: NavController,
    		private zone: NgZone, 
    		public loadingCtrl: LoadingController)
		{
			this.fireAuth = firebase.auth(); //firebase authentication service
			this.userProfile = firebase.database().ref('/users'); //create table named( userProfile
			this.storageRef = firebase.storage().ref(); //create storage reference
			this.databaseRef = firebase.database().ref();


		}
		loginFacebook(page: any=null){
			Facebook.getLoginStatus().then((response) =>{
		       if(response.status === 'connected'){
		           Facebook.login(['email']).then( (response) => {
		              const facebookCredential = firebase.auth.FacebookAuthProvider
		                  .credential(response.authResponse.accessToken);

		              firebase.auth().signInWithCredential(facebookCredential)
		              .then((success) => {

		                  console.log("Firebase success: " + JSON.stringify(success));
		           
		                  this.zone.run(() => {
		                    this.navCtrl.setRoot(page);
		                  });
		                  
		              })
		              .catch((error) => {
		                  console.log("Firebase failure: " + JSON.stringify(error));
		              });

		          }).catch((error) => { console.log(error) });

		       }else{
		            Facebook.login(['email']).then( (response) => {
		              const facebookCredential = firebase.auth.FacebookAuthProvider
		                  .credential(response.authResponse.accessToken);

		              firebase.auth().signInWithCredential(facebookCredential)
		              .then((success) => {
		              		this.databaseRef.child('/locations/').once("value").then((snapshot) =>{
								this.databaseRef.child('/missions/'+success.uid).set(snapshot.val());
							});
		                  console.log("Firebase success: " + JSON.stringify(success));
		                  this.databaseRef.child('/users/'+success.uid).set({
		                    user_email: success.email,
		                    user_name: success.displayName,
		                    user_fullname: "",
		                    user_photo: success.photoURL,
		                    user_join_date: new Date().toString(),
		                    user_points: 0,
		                    user_obs: 0,
		                    user_last_obs: new Date().getTime(),
		                    user_submission_open: 0,
		                    user_last_cal_point: new Date().getTime(),
		                    num_visit: 0
		                  });
		                   this.zone.run(() => {
		                     this.navCtrl.setRoot(page);
		                   });		                   		                
		                  
		              })
		              .catch((error) => {
		                  console.log("Firebase failure: " + JSON.stringify(error));
		              });

		            }).catch((error) => { console.log(error) });
		      }
		    });
		}
		signupUser(email: string, password: string, username: string): any {
			let date = new Date(); //register date

			return this.fireAuth.createUserWithEmailAndPassword(email, password)
			.then((newUser) => {
				this.databaseRef.child('/locations/').once("value").then((snapshot) =>{
					this.databaseRef.child('/missions/'+newUser.uid).set(snapshot.val());
				});
				this.databaseRef.child('/users/'+newUser.uid).set({
					user_email: email,
					user_name: username,
					user_fullname: "",
					user_photo: "https://firebasestorage.googleapis.com/v0/b/jarvigogreen.appspot.com/o/profile%2Favatar.png?alt=media&token=5496a646-17fe-47aa-9d1f-7ea4507c65bc",
					user_join_date: date.toString(),
					user_points: 0,
					user_obs: 0,
					user_last_obs: date.getTime(),
					user_submission_open: 0,
					user_last_cal_point: date.getTime(),
					num_visit: 0

				});
			});
		}
		loginUser(email: string, password: string): any {
			return this.fireAuth.signInWithEmailAndPassword(email, password);
		}
		resetPasswordUser(email: string): any{
			return this.fireAuth.sendPasswordResetEmail(email);
		}
		logoutUser(): any {
  			return this.fireAuth.signOut();
		}
		updateProfileUser(image: any=null, fullname: any=null, username: any=null): any{
			if(image!=null){
				this.storageRef.child('profile/'+this.fireAuth.currentUser.uid).putString(image, 'base64',{contentType: 'image/JPEG'}).
				then((savedImage) => {
					this.userProfile.child(this.fireAuth.currentUser.uid).update({
						user_fullname: fullname,
						user_name: username,
						user_photo: savedImage.downloadURL
					});
				});
			}else{
				this.userProfile.child(this.fireAuth.currentUser.uid).update({
						user_fullname: fullname,
						user_name: username
				});
			}
		}
		

	}
