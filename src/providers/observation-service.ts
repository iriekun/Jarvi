import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';


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

	constructor() {
			this.storageRef = firebase.storage().ref(); //create storage reference
			this.user = firebase.auth().currentUser;
			this.databaseRef = firebase.database().ref();
	}
	// recordPoints(username: any = null, photo: any = null, point: any = null): any{
	// 	let foo = {};
	// 	let key = this.user.uid;
	// 	foo[key] = point+20; 
	// 	this.databaseRef.child('/points/').update(foo);
	// }
	readSubmissionOpen(): any{
		this.databaseRef.child('/users/'+ this.user.uid).once("value").then((snapshot) =>{
			this.UpdateSubmissionOpen(snapshot.val().user_submission_open);
		});	
	}
	UpdateSubmissionOpen(open: any =null): any{
		this.databaseRef.child('/users/'+this.user.uid).update({
			user_submission_open :open+1
		});
	}

	readPoints(): any{
		this.databaseRef.child('/users/'+ this.user.uid).once("value").then((snapshot) =>{
		//	this.getPoints(snapshot.val().user_points);
			this.updateProfile(snapshot.val().user_points, snapshot.val().user_obs);
		//	this.recordPoints(snapshot.val().user_name, snapshot.val().user_photo, snapshot.val().user_points);
		});	
	}

	updateProfile(point: any = null, obs: any = null): any{
	//this.points = this.readPoints();	
		this.databaseRef.child('/users/'+this.user.uid).update({
			user_points : point+20,
			user_obs : obs +1,
			user_last_obs : new Date().getTime()
		});
	}

  	recordObservation(image: any = null, latitude: any = null, longitude: any = null,
  	 detail: any = null, obs_value: any = null, task_name: any = null, time_start: any=null,
  	 time_end: any=null): any{

  		let date = new Date();
    	//let randomId = Math.floor((Math.random() * 100000) + 1);
    	let value = task_name+ "-"+ obs_value;
		let foo = {};
		let time_complete = time_end-time_start;
		foo[date.toString()] = value; 

		this.databaseRef.child('/history/'+this.user.uid).update(foo);
		this.readPoints();
		this.databaseRef.child('/missions/'+this.user.uid+"/"+task_name).update({
			state: "done"
		});

    	if(image != null){
			return this.storageRef.child('/images/'+this.user.uid+'-'+date.getTime()).putString(image, 'base64',{contentType: 'image/JPEG'}).
				then((savedImage) => {
					this.databaseRef.child('/observations/').push({
						user_id : this.user.uid,
						task_name : task_name,
						obs_img_url : savedImage.downloadURL,
						obs_latitude : latitude,
						obs_longitude : longitude,
						obs_detail: detail,
						obs_value : obs_value,
						obs_date : date.toString(),
						time_complete: time_complete
					});
					
				});
    	}
		else{
			return this.databaseRef.child('/observations/').push({
				user_id : this.user.uid,
				task_name : task_name,
				obs_latitude : latitude,
				obs_longitude : longitude,
				obs_detail: detail,
				obs_value : obs_value,
				obs_date : date.toString(),
				time_complete: time_complete

			});
		}

  	}
}
