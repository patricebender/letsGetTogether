import { NgModule } from '@angular/core';
import { SurveyComponent } from './survey/survey';
import { WaitForItComponent } from './wait-for-it/wait-for-it';
import {IonicModule} from "ionic-angular";
import { AdminControlsComponent } from './admin-controls/admin-controls';
import { GuessComponent } from './guess/guess';
@NgModule({
	declarations: [SurveyComponent,
    SurveyComponent,
    WaitForItComponent,
    AdminControlsComponent,
    GuessComponent],
	imports: [
    IonicModule
  ],
	exports: [SurveyComponent,
    SurveyComponent,
    WaitForItComponent,
    AdminControlsComponent,
    GuessComponent]
})
export class ComponentsModule {}
