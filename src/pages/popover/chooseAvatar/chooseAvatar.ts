import {ViewController} from "ionic-angular";
import {Component} from "@angular/core";
import {Settings} from "../../settings";

@Component({
  template: `
    <ion-list>
      <button  ion-item *ngFor="let avatar of avatarFileNames" (click)="closeAndChooseAvatar(avatar)">
        <ion-avatar >
          <img src="../../assets/avatar/{{avatar}}">
        </ion-avatar>
      </button>
    </ion-list>
  `
})
export class ChooseAvatarPage {
  constructor(public viewCtrl: ViewController) {
  }

  closeAndChooseAvatar(avatarFile) {
    Settings.user.avatar = avatarFile;
    this.viewCtrl.dismiss();
  }

  get avatarFileNames() {
    return Settings.avatarFileNames;
  }
}
