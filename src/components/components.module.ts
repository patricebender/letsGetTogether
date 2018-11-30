import { NgModule } from '@angular/core';
import { SurveyComponent } from './survey/survey';
import { WaitForItComponent } from './wait-for-it/wait-for-it';
import {IonicModule} from "ionic-angular";
import { StartCardComponent } from './start-card/start-card';
import { GuessComponent } from './guess/guess';
@NgModule({
	declarations: [SurveyComponent,
    SurveyComponent,
    WaitForItComponent,
    StartCardComponent,
    StartCardComponent,
    GuessComponent,
    GuessComponent],
	imports: [
    IonicModule
  ],
	exports: [SurveyComponent,
    SurveyComponent,
    WaitForItComponent,
    StartCardComponent,
    StartCardComponent,
    GuessComponent,
    GuessComponent]
})
export class ComponentsModule {}
