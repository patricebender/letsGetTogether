import {Component} from '@angular/core';
import {Settings} from "../../pages/settings";
import {Socket} from "ng-socket-io";
import {Observable} from "rxjs";

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


  userAnswer = '';

  get waitingForResults() {
    return Settings.waitForCardResponse;
  }


  events = [];

  get survey() {
    return Settings.game.currentCard;
  }

  constructor(private socket: Socket) {
    this.registerEvents();
  }

  ionViewWillLeave() {
    this.events.forEach((event) => {
      event.unsubscribe();
    })
  }

  emitAnswer(option) {
    console.log("User picked " + option.title)
    Settings.waitForCardResponse = true;
    this.userAnswer = option.title;

    this.socket.emit('surveyAnswer', {surveyTitle: this.survey.title, answer: option.title})

  }

  registerEvents() {
    let waitForSurveyResults = this.onReceiveSurveyResults().subscribe((data) => {
      let survey = data['survey'];
      Settings.game.currentCard = survey;
      console.log("Received results for " + JSON.stringify(survey))
    });

    this.events.push(waitForSurveyResults);

  }

  private onReceiveSurveyResults() {
    return new Observable((observer) => {
      this.socket.on('surveyResults', (data) => {
        observer.next(data);
      })
    })
  }
}
