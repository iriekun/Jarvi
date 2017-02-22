import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';


/*
  Generated class for the ObservationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ObservationService {

  // constructor(public http: Http) {
  //   console.log('Hello ObservationService Provider');
  // }
  	public databaseRef : any; 
  	public storageRef: any;
  	public user: any;
  	public points: any;
  	public d: any = null;
  	public a: any = {};
 

	constructor() {
			this.storageRef = firebase.storage().ref(); //create storage reference
			this.user = firebase.auth().currentUser;
			this.databaseRef = firebase.database().ref();
	}

	recordPoints(username: any = null, point: any = null): any{
		let foo = {};
		foo[username] = point+20; 
		this.databaseRef.child('/points/').update(foo);
	}
	readPoints(): any{
		this.databaseRef.child('/users/'+ this.user.uid).once("value").then((snapshot) =>{
		//	this.getPoints(snapshot.val().user_points);
			this.updateProfile(snapshot.val().user_points, snapshot.val().user_obs);
			this.recordPoints(snapshot.val().user_name, snapshot.val().user_points);
		});	
	}
	getPoints(point: any = null): any{
		//this.points = parseInt(point) + 20;
		console.log("point="+ this.points);
	}

	updateProfile(point: any = null, obs: any = null): any{
	//this.points = this.readPoints();	
		this.databaseRef.child('/users/'+this.user.uid).update({
			user_points : point+20,
			user_obs : obs +1
		});
	}

  	recordObservation(image: any = null, latitude: any = null, longitude: any = null,
  	 detail: any = null, obs_value: any = null, task_id: any = null): any{

  		let date = new Date();
    	let randomId = Math.floor((Math.random() * 100000) + 1);
    	let value = task_id+ "-"+ obs_value;
		let foo = {};
		foo[date.toString()] = value; 
    	if(image != null){
    // this.storageRef.child('images/img_'+ randomId).put(image).then((savedImage) => {
		// this.observation.child('obs_'+randomId).set({
			this.storageRef.child('images/img_'+ randomId).putString(image, 'base64',{contentType: 'image/JPEG'}).
				then((savedImage) => {
					this.databaseRef.child('/observations/obs_'+randomId).set({
						user_id : this.user.uid,
						task_id : task_id,
						obs_img_url : savedImage.downloadURL,
						obs_latitude : latitude,
						obs_longitude : longitude,
						obs_detail: detail,
						obs_value : obs_value,
						obs_date : date.toString(),
						obs_millisecond : date.getTime()
					});
					this.databaseRef.child('/history/'+this.user.uid).update(foo);
					this.readPoints();
			});
    	}
		else{
			this.databaseRef.child('/observations/obs_'+randomId).set({
				user_id : this.user.uid,
				task_id : task_id,
				obs_latitude : latitude,
				obs_longitude : longitude,
				obs_detail: detail,
				obs_value : obs_value,
				obs_date : date.toString(),
				obs_millisecond : date.getTime()
			});
			this.databaseRef.child('/history/'+this.user.uid).update(foo);

			this.readPoints(); //read user_points value from db & update points

		}

  	}
}
