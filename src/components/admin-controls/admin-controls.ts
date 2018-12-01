import { Component } from '@angular/core';
import {Socket} from "ng-socket-io";
import {Settings} from "../../pages/settings";
import {NavController} from "ionic-angular";

/**
 * Generated class for the StartCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'admin-controls',
  templateUrl: 'admin-controls.html'
})
export class AdminControlsComponent {

  get currentCard() {
    return Settings.game.currentCard;
  }

  get game() {
    return Settings.game;
  }


  get user() {
    return Settings.user;
  }

  constructor(private socket: Socket, private navCtrl: NavController) {
  }

  startGame() {
      Settings.waitForCardResponse = false;
      this.socket.emit('newCardRequest');
  }

  goToGameSettings() {
    this.navCtrl.push('GameSettingsPage');
  }
}
