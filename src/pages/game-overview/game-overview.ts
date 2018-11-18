import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Settings} from "../settings";

/**
 * Generated class for the GameOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game-overview',
  templateUrl: 'game-overview.html',
})
export class GameOverviewPage {

  @ViewChild(Content) content: Content;

  get user() {
    return Settings.user;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad GameOverviewPage');
  }

  ionViewDidEnter() {
    if (!this.user.name) {
      this.navCtrl.setRoot('JoinSessionPage');
    }
  }

}
