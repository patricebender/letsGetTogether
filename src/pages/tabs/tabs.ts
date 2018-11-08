import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {GamePage} from "../game/game";

/**
 * Generated class for the JoinOrCreatePage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  joinSessionRoot = 'JoinSessionPage'
  createSessionRoot = 'CreateSessionPage'
  gameRoot = 'GamePage'

  get isGameStarted() {
    return GamePage.isGameStarted;
  }
  constructor(public navCtrl: NavController) {
  }

}
