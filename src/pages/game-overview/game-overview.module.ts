import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameOverviewPage } from './game-overview';

@NgModule({
  declarations: [
    GameOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(GameOverviewPage),
  ],
})
export class GameOverviewPageModule {}
