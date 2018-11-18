import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Settings} from "../settings";
import {Socket} from "ng-socket-io";
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


  newName: string;

  constructor(private device: Device,public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private popoverCtrl: PopoverController) {
    Settings.listenForUserChanges(this.socket);
  }

  avatarFileNames = [];

  get avatar() {
    return Settings.user.avatar;
  }

  set avatar(fileName) {
    this.socket.emit('avatarChanged', {newAvatar: fileName});
    Settings.user.avatar = fileName;
  }

  set userName(name) {
    console.log(name)
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


  presentAvatarPopover() {
    let popover = this.popoverCtrl.create(ChooseAvatarPage);
    popover.present();
  }


  saveUserChanges() {
    console.log(this.newName)
    this.userName = this.newName;
    //inform others that name has changed
    this.socket.emit('userNameChanged', {newName: this.newName});
  }
}
