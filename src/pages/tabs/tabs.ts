import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { LeaderboardPage } from '../leaderboard/leaderboard';
import { ActivityPage } from '../activity/activity';
import { SettingPage } from '../setting/setting';
import { MapPage } from '../map/map';




@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MapPage;
  tab2Root: any = LeaderboardPage;
  tab3Root: any = ActivityPage;
  tab4Root: any = SettingPage;

  constructor(private viewCtrl: ViewController) {

  }
  ionViewWillEnter() {
        this.viewCtrl.showBackButton(false);
    }
}
