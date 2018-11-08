import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameLobbyPage } from './game-lobby';

@NgModule({
  declarations: [
    GameLobbyPage,
  ],
  imports: [
    IonicPageModule.forChild(GameLobbyPage),
  ],
})
export class GameLobbyPageModule {}
