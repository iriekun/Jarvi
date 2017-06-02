import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the CongratMessage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-congrat-message',
  templateUrl: 'congrat-message.html'
})
export class CongratMessagePage {
	point: any;
	obs: any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public viewCtrl: ViewController, public zone: NgZone) {

  	this.point = navParams.get('point');
  	this.obs = navParams.get('obs');
  	console.log(this.point +": "+ this.obs);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CongratMessagePage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
     this.zone.run(() => {
        this.navCtrl.setRoot(TabsPage);
     });
  }
}
