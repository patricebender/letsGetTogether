import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController, ToastController} from 'ionic-angular';
import {Socket} from "ngx-socket-io";
import {Settings} from "../settings";
import {TapticEngine} from "@ionic-native/taptic-engine";
import {CurseOverviewPage} from "../popover/cursesOverview/curse-overview";

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

  set userName(name) {
    Settings.user.name = name;
  }

  get room() {
    return Settings.room;
  }

  get currentCardCategory() {
    return Settings.game.currentCategory;
  }

  goToUserSettings() {
    this.navCtrl.push('UserPage');
  }

  presentCursePopover() {
    let popover = this.popoverCtrl.create(CurseOverviewPage);
    popover.present();
  }


  constructor(private alertCtrl: AlertController, private popoverCtrl: PopoverController, public taptic: TapticEngine, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
    Settings.listenForCards(this.socket, this.taptic);
    Settings.listenForSurveyUpdates(this.socket);
    // currently needed so that the player count badge in the playerOverview tab is initialized correctly when joining a room
    this.socket.emit('requestUserList');
  }


  saveNameAndEmitChange(newName) {
    this.userName = newName;
    //inform others that name has changed
    this.socket.emit('userNameChanged', {newName: newName});
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

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Name Ändern',
      inputs: [
        {
          name: 'newName',
          placeholder: this.user.name,
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
        },
        {
          text: 'Speichern',
          handler: data => {
            if (data.newName === "") {
              this.presentInputNotValid('Name darf nicht leer sein!')
              return false;
            } else if (data.newName === this.user.name) {
              this.presentInputNotValid('Name muss sich von vorherigem unterscheiden!')
              return false;
            } else {
              console.log(data.newName)
              this.saveNameAndEmitChange(data.newName);
            }
          }
        }
      ]
    });
    alert.present();
  }

  presentInputNotValid(reason) {
    let alert = this.alertCtrl.create({
      title: 'Deine Eingabe passt nicht ganz..',
      subTitle: reason,
      buttons: ['Ok']
    });
    alert.present();
  }

}
