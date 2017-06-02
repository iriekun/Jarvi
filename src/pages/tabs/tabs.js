var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { LeaderboardPage } from '../leaderboard/leaderboard';
import { ActivityPage } from '../activity/activity';
import { SettingPage } from '../setting/setting';
import { MapPage } from '../map/map';
var TabsPage = (function () {
    function TabsPage(viewCtrl) {
        this.viewCtrl = viewCtrl;
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = MapPage;
        this.tab2Root = LeaderboardPage;
        this.tab3Root = ActivityPage;
        this.tab4Root = SettingPage;
    }
    TabsPage.prototype.ionViewWillEnter = function () {
        this.viewCtrl.showBackButton(false);
    };
    return TabsPage;
}());
TabsPage = __decorate([
    Component({
        templateUrl: 'tabs.html'
    }),
    __metadata("design:paramtypes", [ViewController])
], TabsPage);
export { TabsPage };
//# sourceMappingURL=tabs.js.map