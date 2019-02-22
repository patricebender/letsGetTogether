import { NgModule } from '@angular/core';

import { CurseOverviewPage } from './curse-overview';
import {IonicPageModule} from "ionic-angular";

@NgModule({
  declarations: [
    CurseOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CurseOverviewPage),
  ],
  entryComponents: [
    CurseOverviewPage,
  ]
})
export class CurseOverviewPageModule {}
