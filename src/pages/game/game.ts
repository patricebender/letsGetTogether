import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    GamePage.isGameStarted = true;
  }

  get gameState() {
    return GamePage.isGameStarted;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

}
