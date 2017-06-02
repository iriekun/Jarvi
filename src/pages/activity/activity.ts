import { Component, ViewChild } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Chart } from 'chart.js';




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
  @ViewChild('doughnutCanvas') doughnutCanvas;
    doughnutChart: any;

	public databaseRef : any; 
  public loading: any;

	public obj1 : any = {};
  public obj2 : any = {};
  public obj3 : any = {};
  public city=1;
  constructor(public loadingCtrl: LoadingController) {

  			this.databaseRef = firebase.database().ref();

  }
  ionViewDidEnter(){
    if(this.city==1){

    this.loading = this.loadingCtrl.create({
         content: "Please wait..."
      });
    this.loading.present();
    setTimeout(() => {
        this.loading.dismiss();
      }, 5000);
    this.getRecord().then(() =>{
      this.loading.dismiss();
      let length = Object.keys(this.obj1).length+Object.keys(this.obj2).length+Object.keys(this.obj3).length;
      let data1 = Object.keys(this.obj1).length/length*100;
      let data2 = Object.keys(this.obj2).length/length*100;
      let data3 = Object.keys(this.obj3).length/length*100;
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {  
   
          type: 'doughnut',
          data: {
              labels: ["Compact", "Partial", "No"],
              datasets: [{
                  label: '# of Votes',
                  data: [data1, data2, data3],
                  backgroundColor: [
                      // 'rgba(255, 99, 132, 0.2)',
                      // 'rgba(54, 162, 235, 0.2)',
                      // 'rgba(255, 206, 86, 0.2)'
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56"
                      
                  ],
                  hoverBackgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56"
                      
                  ]
              }]
          }
   
        });
      
      
    });
   }
  }
  getRecord(){

    return this.databaseRef.child('/observations/').orderByChild('obs_value').once("value").then((snapshot) =>{
      snapshot.forEach((data) => {
        if(data.val().obs_value=="Compact"){
          this.getRecordValue1(data);
        }else if(data.val().obs_value=="Partial"){
          this.getRecordValue2(data);
        }else{
          this.getRecordValue3(data);

        }
      });
    });
  }
  getRecordValue1(data: any = null) : any{
    this.obj1[data.key] = data.val();

  }
  getRecordValue2(data: any = null) : any{
    this.obj2[data.key] = data.val();

  }
  getRecordValue3(data: any = null) : any{
    this.obj3[data.key] = data.val();

  }

}
