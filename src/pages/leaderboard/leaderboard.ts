import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ObservationService } from '../../providers/observation-service';
import * as firebase from 'firebase';


/*
  Generated class for the Leaderboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
  providers: [ObservationService]

})
export class LeaderboardPage {
	  	public databaseRef : any; 
	  	public user: any;
	  	public obj = {}; //name:point 
	  	public pointArray=[];
	  	public nameArray=[];
	  	public len: any =0;
	  	public imageShowOnUi: any;
	  	  loading: any;



  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	    public loadingCtrl: LoadingController, 

  	public observationService: ObservationService) {

		this.databaseRef = firebase.database().ref();
		this.user = firebase.auth().currentUser;


  }
  range = (value) => { 
    let a = []; 
    for(let i = 0; i < value; ++i) { 
      a.push(i) 
    } 
    return a; 
  }

  	ionViewDidEnter() {
		console.log('ionViewDidLoad LeaderboardPage');

		this.orderPoints();

		this.pointArray = Object.keys(this.obj).map(key => this.obj[key]); //return value
		this.pointArray.reverse();
	//	console.log(this.pointArray.reverse());
		this.nameArray = Object.keys(this.obj); //return key
		this.nameArray.reverse(); 
	//	console.log(this.c.reverse());
		if(this.pointArray.length>0){
			this.len = this.pointArray.length;
		}
		console.log("length="+ this.len);
  }

	orderPoints(): any{
		this.databaseRef.child('/points/').orderByValue().limitToLast(10).once("value", (snapshot) =>{
			snapshot.forEach((data) => {
			 //   console.log("The " + data.key + " score is " + data.val());
			   	this.getOrderedPoint(data);
			});
		});
	}
	getOrderedPoint(data: any = null) : any{
		this.obj[data.key] = data.val();		
	}
	userData(): any{
	    this.databaseRef.child('/users/'+ this.user.uid).once("value").then((snapshot) =>{
	      this.getUserData(snapshot.val().user_photo);
	    });  
  	}
  	getUserData(photo: any=null): any{
	    this.imageShowOnUi = photo;
  	}


}
