import { Component } from '@angular/core';
import {Settings} from "../../pages/settings";

/**
 * Generated class for the WaitForItComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wait-for-it',
  templateUrl: 'wait-for-it.html'
})
export class WaitForItComponent {

  get game() {
    return Settings.game;
  }

  get user() {
    return Settings.user;
  }


  constructor() {

  }

}
