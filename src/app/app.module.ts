import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
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
import { ProfilePage } from '../pages/profile/profile';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
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
    ProfilePage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
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
    ProfilePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
