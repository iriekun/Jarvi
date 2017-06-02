import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { ObservationService } from '../../providers/observation-service';

import { SlideMissionPage } from '../slide-mission/slide-mission';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
    providers: [ObservationService]

})
export class HomePage {

	public databaseRef : any; 
	public user: any;
	public total_point: any;
	public total_obs: any;
	public obj: any = {};
	public dateArray = [];
	public taskArray=[];
	public len: any =0;
	public taskLlist=[];
	public task_title: any;
	public task_subtitle: any;
	public task_duedate: any;

	home: string = "missions";
	tasks = [
		{	
			id: "task_1",
			missionNum: "Mission 001",
			name: "Ice Condition",
			image: "assets/img/bg1.jpg",
			desc: "",
			dueDate:"30 March 2017",
			optionName:"Ice Cover",
			options:["No", "Partial", "Compact"],
			stories:["assets/img/s1.png","assets/img/s2.png","assets/img/s3.png", "assets/img/s4.png", "assets/img/s5.png",
			"assets/img/s6.png","assets/img/s7.png"]
		},
	];

  constructor(public navCtrl: NavController, public observationService: ObservationService) {
  		this.databaseRef = firebase.database().ref();
  		this.user = firebase.auth().currentUser;

  }
   getObj(title: any = null, subtitle: any=null, duedate: any=null) : any{
   	this.task_title = title;
   	this.task_subtitle = subtitle;
   	this.task_duedate = duedate;

  }
  ionViewDidLoad() {
  	this.databaseRef.child('/tasks/t001').once("value").then((snapshot) =>{
	 	  console.log(snapshot);
	 	  this.getObj(snapshot.val().task_title, snapshot.val().task_subtitle, snapshot.val().task_duedate);
         
  	});
  	this.databaseRef.child('/users/'+this.user.uid).once("value").then((snapshot) =>{
          console.log(this.user.uid+":"+ snapshot.val().num_visit);

  		this.updateUserVisit(snapshot.val().num_visit);
  	});
  }
  updateUserVisit(num_visit: any=null): any{
  	this.databaseRef.child('/users/'+this.user.uid).update({
  		num_visit: num_visit+1, 
  		last_visit: new Date().toString()
  	});
  }
  gotoMission(subtitle, optionName, options, stories ){
  	console.log("id="+ subtitle);
  	this.navCtrl.push(SlideMissionPage, {
  		task_name: subtitle,
  		task_option_name: optionName,
  		task_options: options,
  		task_stories: stories
  	});
  }

}
