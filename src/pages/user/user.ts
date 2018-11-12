import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {JoinSessionPage} from "../join-session/join-session";
import {Settings} from "../settings";
import {Socket} from "ng-socket-io";
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {ChooseAvatarPage} from "../popover/chooseAvatar";


/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {


  constructor(private sanitizer: DomSanitizer, public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private popoverCtrl: PopoverController) {
  }

  avatarFileNames = [];

  get avatar() {
    return Settings.user.avatar;
  }

  set avatar(fileName) {
    Settings.user.avatar = fileName;
  }

  set userName(name) {
    Settings.user.name = name;
  }

  get userName() {
    return Settings.user.name;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  ionViewWillEnter() {
    this.socket.connect();
    this.initAvatarAndUser();
  }


  saveAndContinue() {
    this.navCtrl.setRoot(JoinSessionPage);
  }

  presentAvatarPopover() {
    let popover = this.popoverCtrl.create(ChooseAvatarPage);
    popover.present();
  }

  initAvatarAndUser() {
    this.socket.emit('requestAvatarList');
    this.socket.on('receiveAvatarList', (data) => {
      let avatarFileNames = data.avatarFileNames;
      if (avatarFileNames) {
        Settings.avatarFileNames = avatarFileNames;
        //init random user
        Settings.initRandomUser(this.socket);
      }
    })

  }


}
