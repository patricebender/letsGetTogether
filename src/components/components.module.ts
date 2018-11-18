import { NgModule } from '@angular/core';
import { SurveyComponent } from './survey/survey';
import { WaitForItComponent } from './wait-for-it/wait-for-it';
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [SurveyComponent,
    SurveyComponent,
    WaitForItComponent],
	imports: [
    IonicModule
  ],
	exports: [SurveyComponent,
    SurveyComponent,
    WaitForItComponent]
})
export class ComponentsModule {}
