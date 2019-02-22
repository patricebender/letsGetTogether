import {Component} from '@angular/core';
import {Settings} from "../../pages/settings";
import {Socket} from "ng-socket-io";
import {Observable} from "rxjs";

/**
 * Generated class for the GuessComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'guess',
  templateUrl: 'guess.html'
})
export class GuessComponent {


  userAnswer = ''


  events = [];

  get ranking() {
    return Settings.game.currentCard['ranking']
  }

  set ranking(rankarray) {
    Settings.game.currentCard['ranking'] = rankarray;
  }

  get waitForCardResponse() {
    return Settings.waitForCardResponse;
  }

  get receivedResult() {
    return Settings.receivedCardResponse;
  }

  set receivedCardResponse(boolean) {
    Settings.receivedCardResponse = boolean;
  }

  set waitForCardResponse(boolean) {
    Settings.waitForCardResponse = boolean;
  }

  get guess() {
    return Settings.game.currentCard;
  }

  get playerLeftCount() {
    return this.guess['playerLeftCount'];
  }


  get user() {
    return Settings.user;
  }

  constructor(private socket: Socket) {
    this.registerEvents();
  }
  ionViewWillLeave() {
    this.events.forEach((event) => {
      event.unsubscribe();
    })

  }


  registerEvents() {
    let waitForGuessResults = this.onReceiveSurveyResults().subscribe((data) => {
      let guess = data['guess'];
      Settings.game.currentCard = guess;
      console.log("Received results for " + JSON.stringify(guess))
      this.receivedCardResponse = true;
      this.waitForCardResponse = false;
      this.ranking = data['ranking'];
    });

    this.events.push(waitForGuessResults);

  }

  private onReceiveSurveyResults() {
    return new Observable((observer) => {
      this.socket.on('guessResults', (data) => {
        observer.next(data);
      })
    })
  }

  emitAnswer() {
    this.waitForCardResponse = true;
    this.socket.emit('guessAnswer', {guess: this.guess, answer: this.userAnswer})
    this.userAnswer = ''
  }


}
