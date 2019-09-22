import {ViewController} from "ionic-angular";
import {Component} from "@angular/core";
import {Settings} from "../../settings";
import {Socket} from "ngx-socket-io";

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
  constructor(public viewCtrl: ViewController, private socket: Socket) {
  }

  closeAndChooseAvatar(avatarFile) {

    this.socket.emit('avatarChanged', {newAvatar: avatarFile});
    Settings.user.avatar = avatarFile;
    this.viewCtrl.dismiss();
  }

  get avatarFileNames() {
    return Settings.avatarFileNames;
  }
}
