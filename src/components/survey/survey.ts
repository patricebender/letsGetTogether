import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello SurveyComponent Component');
    this.text = 'Hello World';
  }

}
