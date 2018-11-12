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


  constructor(private sanitizer: DomSanitizer, public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private popoverCtrl:PopoverController) {
  }

  avatarFileNames = [];

  get avatar() {
    return Settings.user.avatar;
  }

  set avatar(fileName) {
    Settings.user.avatar = fileName;
  }

  set userName(name) {
    Settings.user.name = name ;
  }

  get userName() {
    return Settings.user.name;
  }

  randomNames = [
    'Peter Punsch',
    'Ronald Rum',
    'Angela Absinth',
    'Ricky la Fleur',
    'Lahey Liquor',
    'Randy Burgers',
    'Karl Kirschwasser',
    'Gisela Gin-Fizz',
    'Valerie Vodka',
    'Marta Mule',
    'Juicy Julian',
    'Boozy Bubbles'
  ]

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  ionViewWillEnter() {
    this.socket.connect();
    this.initAvatarAndUser();
  }


  saveAndContinue() {
    this.socket.disconnect();
    Settings.user.name = this.name;
    // Settings.user.avatar = this.avatar;
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
        if(!Settings.user.avatar){
          Settings.user.avatar = this.getRandomAvatar() ;
          console.log("set avatar to: " + this.avatar)
        }
      }
    })
    if (this.userName === ''){
     this.userName = this.getRandomName();
    }
  }

  private getRandomAvatar() {

    if(this.avatarFileNames){
      return Settings.avatarFileNames[Math.floor(Math.random()*Settings.avatarFileNames.length)];
    }
    return '';
  }

  private getRandomName() {
     return this.randomNames[Math.floor(Math.random()*this.randomNames.length)];
  }
}
