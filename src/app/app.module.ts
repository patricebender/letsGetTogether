import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';


import { MyApp } from './app.component';
import {TabsModule} from "../pages/tabs/tabs.module";
import {UserPageModule} from "../pages/user/user.module";
import {JoinSessionPageModule} from "../pages/join-session/join-session.module";
import {ChooseAvatarPageModule} from "../pages/popover/choose-avatar.module";


//const config: SocketIoConfig = { url: 'http://192.168.2.102:3001', options: {}};
const config: SocketIoConfig = { url: 'localhost:3001', options: {}};
//const config: SocketIoConfig = { url: 'http://10.94.111.184:3001', options: {}};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config),
    TabsModule,
    UserPageModule,
    JoinSessionPageModule,
    ChooseAvatarPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
