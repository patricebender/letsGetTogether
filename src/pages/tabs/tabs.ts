import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, Tabs} from 'ionic-angular';
import {GamePage} from "../game/game";
import {GameLobbyPage} from "../game-lobby/game-lobby";

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

  gameRoot = 'GamePage'
  @ViewChild('myTabs') tabRef: Tabs;


  ionViewWillEnter() {
    this.tabRef.select(0);
  }



  get isGameStarted() {
    return GamePage.isGameStarted;
  }

  get isLobbyJoined() {
    return GameLobbyPage.isLobbyJoined;
  }
  constructor(public navCtrl: NavController) {
  }

}
