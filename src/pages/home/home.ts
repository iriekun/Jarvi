import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { SlideMissionPage } from '../slide-mission/slide-mission';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	home: string = "missions";
	tasks = [
		{	
			id: "task_1",
			missionNum: "Mission 001",
			name: "Ice Condition",
			image: "assets/img/lake-bg.jpg",
			desc: "",
			dueDate:"30 March 2017",
			optionName:"Ice Cover",
			options:["No", "Partial", "Compact"],
			stories:["assets/img/story1.png", "assets/img/story2.png"]
		},
		{
			id: "task_2",
			missionNum: "Mission 002",
			name: "Water Temperature",
			image: "assets/img/lake-bg.jpg",
			desc: "",
			dueDate:"30 March 2017",
			optionName:"Water Temperature",
			options:["<10c", "10-15c", ">15c"],
			stories:["assets/img/story1.png", "assets/img/story2.png"]
		}
	];

  constructor(public navCtrl: NavController) {

  }
  gotoMission(id, name, optionName, options, stories ){
  	console.log("id="+ id);
  	this.navCtrl.push(SlideMissionPage, {
  		task_id: id,
  		task_name: name,
  		task_option_name: optionName,
  		task_options: options,
  		task_stories: stories
  	});
  }

}
