import { NgModule } from '@angular/core';
import { SurveyComponent } from './survey/survey';
import { WaitForItComponent } from './wait-for-it/wait-for-it';
import {IonicModule} from "ionic-angular";
import { AdminControlsComponent } from './admin-controls/admin-controls';
import { GuessComponent } from './guess/guess';
import { GameOverComponent } from './game-over/game-over';
import { QuizComponent } from './quiz/quiz';
import { ChallengeComponent } from './challenge/challenge';
@NgModule({
	declarations: [SurveyComponent,
    SurveyComponent,
    WaitForItComponent,
    AdminControlsComponent,
    GuessComponent,
    GameOverComponent,
    QuizComponent,
    ChallengeComponent],
	imports: [
    IonicModule
  ],
	exports: [SurveyComponent,
    SurveyComponent,
    WaitForItComponent,
    AdminControlsComponent,
    GuessComponent,
    GameOverComponent,
    QuizComponent,
    ChallengeComponent]
})
export class ComponentsModule {}
