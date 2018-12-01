import { Component } from '@angular/core';
import {Settings} from "../../pages/settings";

/**
 * Generated class for the GameOverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'game-over',
  templateUrl: 'game-over.html'
})
export class GameOverComponent {

  get game() {
    return Settings.game;
  }


  get user() {
    return Settings.user;
  }

  constructor() {
    console.log('Hello GameOverComponent Component');
  }

}
