import { Component } from '@angular/core';
import {Settings} from "../../pages/settings";
import {Socket} from "ngx-socket-io";

/**
 * Generated class for the ChallengeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'challenge',
  templateUrl: 'challenge.html'
})
export class ChallengeComponent {



  get user() {
    return Settings.user;
  }

  get challenge() {
    return Settings.game.currentCard;
  }

  get game() {
    return Settings.game;
  }

  get playerLeftCount() {
    return Settings.game.currentCard['playerLeftCount'];
  }

  get waitForCardResponse() {
    return Settings.waitForCardResponse;
  }

  constructor(private socket: Socket) {
  }

  challengeDeclined() {
    this.socket.emit('challengeDeclined');
  }
  challengeAccepted() {
    this.socket.emit('challengeAccepted');
  }

  emitSuccess() {
    Settings.waitForCardResponse = true;
    this.socket.emit('challengeVote', {success: true});
  }

  emitFail() {
    Settings.waitForCardResponse = true;
    this.socket.emit('challengeVote', {success: false});
  }

  ionViewWillLeave() {
    this.socket.emit('challengedPlayerLeaves')
  }
}
