import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameSettingsPage } from './game-settings';

@NgModule({
  declarations: [
    GameSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(GameSettingsPage),
  ],
})
export class GameSettingsPageModule {}
