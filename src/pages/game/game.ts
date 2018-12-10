import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Socket} from "ng-socket-io";
import {Settings} from "../settings";
import {TapticEngine} from "@ionic-native/taptic-engine";

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

  get isGameStarted() {
    return Settings.isGameStarted;
  }

  get game() {
    return Settings.game;
  }


  get user() {
    return Settings.user;
  }

  get room() {
    return Settings.room;
  }

  get currentCardCategory(){
    return Settings.game.currentCategory;
  }

  goToUserSettings() {
    this.navCtrl.push('UserPage');
  }


  constructor(public taptic: TapticEngine, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
    Settings.listenForCards(this.socket, this.taptic);
    Settings.listenForSurveyUpdates(socket);
    // currently needed so that the player count badge in the playerOverview tab is initialized correctly when joining a room
    this.socket.emit('requestUserList');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

  ionViewDidEnter() {
    if (!this.user.name) {
      this.navCtrl.setRoot('JoinSessionPage');
    }
  }

  exitGame() {
    Settings.isGameStarted = false;
    this.socket.emit('leaveRoom');
    this.navCtrl.setRoot('JoinSessionPage');
  }
}
