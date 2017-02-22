import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams,ViewController} from 'ionic-angular';
import { ObservationPage } from '../observation/observation';

/*
  Generated class for the SlideMission page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-slide-mission',
  templateUrl: 'slide-mission.html'
})
export class SlideMissionPage {

 // @ViewChild(Slides) slides: Slides;
  
  public task_id : any;
  public task_name: any;
  public task_stories: any;
  public task_option_name: any;
  public task_options: any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private navParams: NavParams) {

    this.task_id = navParams.get('task_id');
    this.task_stories = navParams.get('task_stories');
    this.task_option_name = navParams.get('task_option_name');
    this.task_options = navParams.get('task_options');
    this.task_name = navParams.get('task_name');

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  openModalObservationPage(){
    this.dismiss();
    let modal = this.modalCtrl.create(ObservationPage, {
      task_id: this.task_id,
      task_option_name: this.task_option_name,
      task_options: this.task_options
    });
    modal.present();
  }
  skip(slide){
    slide.slideTo(2);
  }
}
