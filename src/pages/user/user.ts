import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {JoinSessionPage} from "../join-session/join-session";
import {Settings} from "../settings";
import {Socket} from "ng-socket-io";
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {ChooseAvatarPage} from "../popover/chooseAvatar/chooseAvatar";
import {Device} from '@ionic-native/device';


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


  constructor(private device: Device,public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private popoverCtrl: PopoverController) {
    Settings.listenForUserChanges(this.socket);
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
    Settings.initRandomUser(this.socket, this.device);

  }

  saveAndContinue() {
    this.navCtrl.setRoot(JoinSessionPage);
  }

  presentAvatarPopover() {
    let popover = this.popoverCtrl.create(ChooseAvatarPage);
    popover.present();
  }



}
