import { Component } from '@angular/core';
import {Settings} from "../../pages/settings";

/**
 * Generated class for the SurveyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'survey',
  templateUrl: 'survey.html'
})
export class SurveyComponent {

  get survey(){
    return Settings.game.currentCard;
  }

  constructor() {
  }

  emitAnswer() {

  }
}
