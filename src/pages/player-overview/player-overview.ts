import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Settings} from "../settings";
import {Socket} from "ng-socket-io";

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

  constructor(public socket: Socket, private navCtrl: NavController, public navParams: NavParams) {
    Settings.subscribeUserList(this.socket);
    Settings.subscribeToAdminPromotion(this.socket);
    this.socket.emit('requestUserList');
  }

  ionViewDidEnter() {
    if (!this.user.name) {
      this.navCtrl.setRoot('JoinSessionPage');
    }
  }

  get user() {
    return Settings.user;
  }

  get otherUsers() {
    return Settings.game.otherUsers;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerOverviewPage');
  }

  goToUserSettings() {
    this.navCtrl.push('UserPage')
  }

}
