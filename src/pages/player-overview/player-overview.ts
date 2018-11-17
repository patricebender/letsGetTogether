import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Settings} from "../settings";

/**
 * Generated class for the PlayerOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-overview',
  templateUrl: 'player-overview.html',
})
export class PlayerOverviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



  get user() {
    return Settings.user;
  }

  get otherUsers(){
    return Settings.game.otherUsers;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerOverviewPage');
  }

}
