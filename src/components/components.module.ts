import {NgModule} from '@angular/core';
import {SurveyComponent} from './survey/survey';
import {WaitForItComponent} from './wait-for-it/wait-for-it';
import {IonicModule} from "ionic-angular";
import {AdminControlsComponent} from './admin-controls/admin-controls';
import {GuessComponent} from './guess/guess';
import {GameOverComponent} from './game-over/game-over';
import {QuizComponent} from './quiz/quiz';
import {ChallengeComponent} from './challenge/challenge';
import {MultiplierCurseComponent} from './multiplier-curse/multiplier-curse';

@NgModule({
  declarations: [
    SurveyComponent,
    WaitForItComponent,
    AdminControlsComponent,
    GuessComponent,
    GameOverComponent,
    QuizComponent,
    ChallengeComponent,
    MultiplierCurseComponent],
  imports: [
    IonicModule
  ],
  exports: [
    SurveyComponent,
    WaitForItComponent,
    AdminControlsComponent,
    GuessComponent,
    GameOverComponent,
    QuizComponent,
    ChallengeComponent,
    MultiplierCurseComponent]
})
export class ComponentsModule {
}
