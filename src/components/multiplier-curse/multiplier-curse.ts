import { Component } from '@angular/core';
import {Settings} from "../../pages/settings";

/**
 * Generated class for the MultiplierCurseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'multiplier-curse',
  templateUrl: 'multiplier-curse.html'
})
export class MultiplierCurseComponent {

  constructor() {}

  get curse() {
    return Settings.game.currentCard;
  }

  get user() {
    return Settings.user;
  }

}
