import { NgModule } from '@angular/core';
import { SurveyComponent } from './survey/survey';
import { WaitForItComponent } from './wait-for-it/wait-for-it';
import {IonicModule} from "ionic-angular";
import { StartCardComponent } from './start-card/start-card';
@NgModule({
	declarations: [SurveyComponent,
    SurveyComponent,
    WaitForItComponent,
    StartCardComponent,
    StartCardComponent],
	imports: [
    IonicModule
  ],
	exports: [SurveyComponent,
    SurveyComponent,
    WaitForItComponent,
    StartCardComponent,
    StartCardComponent]
})
export class ComponentsModule {}
