import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';


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

		constructor() {
			this.fireAuth = firebase.auth(); //firebase authentication service
			this.userProfile = firebase.database().ref('/users'); //create table named( userProfile
			this.storageRef = firebase.storage().ref(); //create storage reference
			this.databaseRef = firebase.database().ref();


		}
		signupUser(email: string, password: string, username: string): any {
			let date = new Date(); //register date
			let foo = {};
			foo[username] = 15; 

			return this.fireAuth.createUserWithEmailAndPassword(email, password)
			.then((newUser) => {
				this.userProfile.child(newUser.uid).set({
					user_email: email,
					user_name: username,
					user_firstname: "",
					user_lastname: "",
					user_photo: "https://firebasestorage.googleapis.com/v0/b/jarvigogreen.appspot.com/o/profile%2Favatar.png?alt=media&token=5496a646-17fe-47aa-9d1f-7ea4507c65bc",
					user_join_date: date.toString(),
					user_points: 15,
					user_obs: 0

				});
				this.databaseRef.child('/points/').update(foo);

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
		updateProfileUser(image: any=null, firstname: any=null, lastname: any=null): any{
			if(image!=null){
				this.storageRef.child('profile/'+this.fireAuth.currentUser.uid).putString(image, 'base64',{contentType: 'image/JPEG'}).
				then((savedImage) => {
					this.userProfile.child(this.fireAuth.currentUser.uid).update({
						user_firstname: firstname,
						user_lastname: lastname,
						user_photo: savedImage.downloadURL
					});
				});
			}else{
				this.userProfile.child(this.fireAuth.currentUser.uid).update({
						user_firstname: firstname,
						user_lastname: lastname
				});
			}
		}
		

	}
