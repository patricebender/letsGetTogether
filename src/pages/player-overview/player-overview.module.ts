import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerOverviewPage } from './player-overview';

@NgModule({
  declarations: [
    PlayerOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerOverviewPage),
  ],
})
export class PlayerOverviewPageModule {}
