import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';



/*
  Generated class for the Activity page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {
	public databaseRef : any; 
	public user: any;
	public total_point: any;
	public total_obs: any;
	public obj: any = {};
	public dateArray = [];
	public taskArray=[];
	public len: any =0;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    console.log('ionViewDidLoad ActivityPage');
    this.userData();
    this.historyData();
    this.taskArray = Object.keys(this.obj).map(key => this.obj[key]); //return value
    this.dateArray = Object.keys(this.obj); //return key
    if(this.taskArray.length>0){
		  this.len = this.taskArray.length;
	  }
  }
  userData(): any{
  	this.databaseRef.child('/users/'+ this.user.uid).once("value").then((snapshot) =>{
		//	this.getPoints(snapshot.val().user_points);
			this.getUserData(snapshot.val().user_points, snapshot.val().user_obs);
	});	
  }
  getUserData(point: any = null, obs: any=null): any{
  	this.total_point = point;
  	this.total_obs = obs;
  }
  historyData(): any{
  	this.databaseRef.child('/history/'+this.user.uid).limitToLast(10).once("value", (snapshot) =>{
			snapshot.forEach((data) => {
			 //   console.log("The " + data.key + " score is " + data.val());
			   	this.getHistoryData(data);
			});

	});
  }
  getHistoryData(data: any =null): any{
  		this.obj[data.key] = data.val();		
  }

}
