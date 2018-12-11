import {Component} from '@angular/core';
import {Settings} from "../../pages/settings";
import {Socket} from "ng-socket-io";
import {Observable} from "rxjs";

/**
 * Generated class for the QuizComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'quiz',
  templateUrl: 'quiz.html'
})
export class QuizComponent {

  userAnswer = '';
  answerTime = 0;
  events = [];


  get waitForCardResponse() {
    return Settings.waitForCardResponse;
  }

  get ranking() {
    return Settings.game.currentCard.ranking;
  }

  set ranking(rankarray) {
    Settings.game.currentCard.ranking = rankarray;
  }

  get receivedCardResponse() {
    return Settings.receivedCardResponse;
  }

  get playerLeftCount() {
    return this.quiz.playerLeftCount;
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

  get quiz() {
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

  registerEvents() {
    let waitForGuessResults = this.onReceivedQuizResults().subscribe((data) => {

      let quiz = data['quiz'];
      Settings.game.currentCard = quiz
      this.ranking = data['ranking'];

      console.log("Received results for " + JSON.stringify(quiz))

      this.receivedCardResponse = true;
      this.waitForCardResponse = false;

    });

    this.events.push(waitForGuessResults);

  }


  private onReceivedQuizResults() {
    return new Observable((observer) => {
      this.socket.on('quizResults', (data) => {
        observer.next(data);
      });
    });
  }


  emitAnswer(option) {
    Settings.waitForCardResponse = true;
    this.answerTime = Settings.timeSinceNewCard;
    this.userAnswer = option.text;
    this.socket.emit("quizAnswer", {answer: option, time: this.answerTime});
  }

}

