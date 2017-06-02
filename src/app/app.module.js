var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SlideStarterPage } from '../pages/slide-starter/slide-starter';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SlideMissionPage } from '../pages/slide-mission/slide-mission';
import { ActivityPage } from '../pages/activity/activity';
import { LeaderboardPage } from '../pages/leaderboard/leaderboard';
import { SettingPage } from '../pages/setting/setting';
import { ObservationPage } from '../pages/observation/observation';
import { AboutPage } from '../pages/about/about';
import { ProfilePage } from '../pages/profile/profile';
import { MapPage } from '../pages/map/map';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            TabsPage,
            LoginPage,
            SignupPage,
            SlideStarterPage,
            ResetPasswordPage,
            SlideMissionPage,
            ActivityPage,
            LeaderboardPage,
            SettingPage,
            ObservationPage,
            ProfilePage,
            AboutPage,
            MapPage
        ],
        imports: [
            IonicModule.forRoot(MyApp)
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            HomePage,
            TabsPage,
            LoginPage,
            SignupPage,
            SlideStarterPage,
            ResetPasswordPage,
            SlideMissionPage,
            ActivityPage,
            LeaderboardPage,
            SettingPage,
            ObservationPage,
            ProfilePage,
            AboutPage,
            MapPage
        ],
        providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map