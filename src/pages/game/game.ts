import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Socket} from "ng-socket-io";

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

  user = '';
  otherUsers = [];
  room = '';


  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
  }

  get gameState() {
    return GamePage.isGameStarted;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

  ionViewDidEnter() {
    GamePage.isGameStarted = true;
  }

  exitGame() {
    GamePage.isGameStarted = false;
    this.socket.disconnect();
    this.navCtrl.setRoot('JoinSessionPage');
  }
}
