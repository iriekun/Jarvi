import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
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
import { CongratMessagePage } from '../pages/congrat-message/congrat-message';
import { ObsDetailPage } from '../pages/obs-detail/obs-detail';



@NgModule({
  declarations: [
    MyApp,
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
    MapPage,
    CongratMessagePage,
    ObsDetailPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
    MapPage,
    CongratMessagePage,
    ObsDetailPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
