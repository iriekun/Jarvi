import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { Connectivity } from '../../providers/connectivity';
import { Chart } from 'chart.js';



/*
  Generated class for the Leaderboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var Connection: any;

@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
  providers:[Connectivity]
})

export class LeaderboardPage {
	 @ViewChild('doughnutCanvas') doughnutCanvas;
    doughnutChart: any=null;

  	public databaseRef : any; 
  	public user: any;
  	public obj = {}; //name:point 
  	public len: any =0;
  	public imageShowOnUi: any;
  	public leaderboardList =[];

	public total_point: any;
	public total_obs: any;
	public dateArray = [];
	public taskArray=[];
	public objActivity = {};
	public nDay: any;
	public calDay: any;

	loading: any;
	ranking: any;
	data1: any=0;
	data2: any=0;
	b=0;


	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
	    public loadingCtrl: LoadingController, 
	    public zone: NgZone,
	    public connectivityService: Connectivity) {

		this.databaseRef = firebase.database().ref();
		this.user = firebase.auth().currentUser;
		this.ranking = 1; //initilize segment
	}

  	ionViewDidEnter() {
  		
   		this.loading = this.loadingCtrl.create({
     		content: "Please wait...",

    	});
    	this.loading.present();
    // 	setTimeout(() => {
    // 		this.loading.dismiss();
  		// }, 5000);
 		this.leaderboard().then(() =>{
 			console.log("ranking="+this.ranking);
    		this.loading.dismiss();
    		this.leaderboardList = Object.keys(this.obj).map(key => this.obj[key]); //return value
			//console.log(this.leaderboardList);

			this.leaderboardList.reverse().forEach((item) =>{
				console.log(item.user_name);
			});
    	});
   //  	this.loadActivity();
 
 	}
	getOrderedPoint(data: any = null) : any{
		this.obj[data.key] = data.val();
		// this.leaderboardList.push({
  //  			name:data.val().user_name,
  //  			point:data.val().user_points,
  //  			photo:data.val().user_photo
				
		// });		
	}
  	leaderboard(){
  		return this.databaseRef.child('/users/').orderByChild('user_points').limitToLast(10).once("value").then((snapshot) =>{
			snapshot.forEach((data) => {
			//   console.log("The " + data.key + " score is " + data.val().user_points);
			//   console.log(data.val().user_name);
			console.log(data.val().user_name + data.val().user_points);

			   this.getOrderedPoint(data);
			});
		}, (error) =>{
			console.log("The read failed: " + error.code);
		});
  	}
  	range = (value) => { 
		let a = []; 
		for(let i = 0; i < value; ++i) { 
		  a.push(i) 
		} 
		return a; 
	}

  	userData(): any{
  	
		return this.databaseRef.child('/users/'+ this.user.uid).once("value").then((snapshot) =>{
		//	this.getPoints(snapshot.val().user_points);
			this.getUserData(snapshot.val().user_points, snapshot.val().user_obs, snapshot.val().user_last_obs, snapshot.val().user_last_cal_point);
		});	
  		
	  	
	}
	getUserData(point: any = null, obs: any=null, ms_obs: any=null, ms_last_cal: any=null): any{
		let date = new Date().getTime();
		this.total_obs = obs;
		//calculate punishment point 1 day -5pt

		this.nDay = Math.floor((date-ms_obs)/86400000); 
		this.calDay = Math.floor((date-ms_last_cal)/86400000);
		console.log("last obs="+ ms_obs);
		console.log("num day ="+this.nDay);

		if(this.calDay>0){
			if(this.nDay>0){
				let pt = point - (5*this.nDay);
				if(pt<0){ //verify point must be >0
					this.total_point = 0;
				}else{
					this.total_point = pt;
				}
				this.databaseRef.child('/users/'+this.user.uid).update({
					user_points : this.total_point,
					user_last_cal_point: new Date().getTime()
				});
			}
			
		}else{
			this.total_point = point;
		}		
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
		this.objActivity[data.key] = data.val();		
	}

	loadActivity(){
		this.userData().then(() =>{
			this.taskArray = Object.keys(this.objActivity).map(key => this.objActivity[key]); //return value
    	this.taskArray.reverse();
    	this.dateArray = Object.keys(this.objActivity); //return key
    	this.dateArray.reverse();
    	
    	if(this.taskArray.length>0){
		  this.len = this.taskArray.length;
	  }
	  if(this.total_obs>=20){
	  	this.data1 =20;
	  }else{
	  	this.data1 = this.total_obs; //total obs = 20
	  }
	  

	  this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {  
   
          type: 'bar',
          data: {
              labels: ["Number of Observation"],
              datasets: [{
              	  label: "Your total obsevation",
                  data: [this.data1, 5,10,15,20],
                  backgroundColor: [
                     'rgba(75, 192, 192, 1)'
                      
                  ],
                  borderColor:[
                 	'rgba(75, 192, 192, 1)'
                  ],
                 
              }]
          },
          options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
          }
   
        });

		});
		//this.historyData();
		console.log(this.objActivity);
		
	}

}
