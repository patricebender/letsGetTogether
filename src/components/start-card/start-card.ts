import { Component } from '@angular/core';
import {Socket} from "ng-socket-io";
import {Settings} from "../../pages/settings";

/**
 * Generated class for the StartCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'start-card',
  templateUrl: 'start-card.html'
})
export class StartCardComponent {

  get currentCard() {
    return Settings.game.currentCard;
  }

  constructor(private socket: Socket) {
  }

  startGame() {
      Settings.waitForCardResponse = false;
      this.socket.emit('newCardRequest');
  }
}
