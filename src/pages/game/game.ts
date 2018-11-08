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
  static gameSocket: Socket;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    GamePage.isGameStarted = true;
  }

  get gameState() {
    return GamePage.isGameStarted;
  }

  get gameSocket(){
    return GamePage.gameSocket;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

  exitGame() {
    GamePage.isGameStarted = false;
    this.navCtrl.setRoot('JoinSessionPage');
  }
}
