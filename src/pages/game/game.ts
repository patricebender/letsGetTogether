import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Socket} from "ng-socket-io";
import {Settings} from "../settings";

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  static isGameStarted = false;

  otherUsers = [];

  get user() {
    return Settings.user;
  }

  get room() {
    return Settings.room;
  }


  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
  }

  get gameState() {
    return GamePage.isGameStarted;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

  ionViewDidEnter() {
    if (!this.user.name) {
      this.navCtrl.setRoot('JoinSessionPage');
    } else {
      GamePage.isGameStarted = true;
    }

  }

  exitGame() {
    GamePage.isGameStarted = false;
    this.socket.emit('leaveRoom');
    this.navCtrl.setRoot('JoinSessionPage');
  }

  private showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
