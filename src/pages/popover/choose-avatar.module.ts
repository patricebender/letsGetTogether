import { NgModule } from '@angular/core';

import { ChooseAvatarPage } from './chooseAvatar';
import {IonicPageModule} from "ionic-angular";

@NgModule({
  declarations: [
    ChooseAvatarPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseAvatarPage),
  ],
  entryComponents: [
    ChooseAvatarPage,
  ]
})
export class ChooseAvatarPageModule {}
