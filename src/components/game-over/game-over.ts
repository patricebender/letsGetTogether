import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello GameOverComponent Component');
    this.text = 'Hello World';
  }

}
