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
  losers = [];

  get waitForCardResponse() {
    return Settings.waitForCardResponse;
  }

  get receivedCardResponse() {
    return Settings.receivedCardResponse;
  }

  get playerLeftCount() {
    return this.survey.playerLeftCount;
  }

  set receivedCardResponse(boolean) {
    Settings.receivedCardResponse = boolean;
  }

  set waitForCardResponse(boolean) {
    Settings.waitForCardResponse = boolean;
  }

  get user() {
    return Settings.user;
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
    Settings.waitForCardResponse = true;
    this.userAnswer = option.title;
    this.socket.emit('surveyAnswer', {survey: this.survey, answer: option.title})

  }

  registerEvents() {
    let waitForSurveyResults = this.onReceiveSurveyResults().subscribe((data) => {
      let survey = data['survey'];
      Settings.game.currentCard = survey;
      console.log("Received results for " + JSON.stringify(survey))
      this.receivedCardResponse = true;
      this.userAnswer = '';
      this.waitForCardResponse = false;


      this.losers = data['losers'];
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
