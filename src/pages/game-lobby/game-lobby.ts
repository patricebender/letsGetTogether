import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import {Socket} from 'ng-socket-io';
import {Observable} from "rxjs";
import {GamePage} from "../game/game";
import {TabsPage} from "../tabs/tabs";
import {Settings} from "../settings";

/**
 * Generated class for the GameLobbyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game-lobby',
  templateUrl: 'game-lobby.html',
})
export class GameLobbyPage {

  static isLobbyJoined = false;

  get room() {
    return Settings.room;
  }

  get user() {
    return Settings.user;
  }

  set isAdmin(value) {
    Settings.user.isAdmin = value;
  }

  get otherUsers() {
    return Settings.game.otherUsers;
  }
  events = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
    Settings.subscribeUserList(this.socket);
    Settings.subscribeToAdminPromotion(this.socket);
  }

  registerEvents() {
    let userEvent = this.usersChanged().subscribe((data) => {
      this.showToast(data['user'].name + " " + data['event']);
    })

    let waitForStart = this.waitForStart().subscribe((data) => {
      Settings.game.isGameStarted = true;
      this.navCtrl.setRoot(TabsPage);
    })


    this.events.push(userEvent, waitForStart);
  }



  ionViewDidEnter() {
    if (!this.user.name) {
      this.navCtrl.setRoot('JoinSessionPage');
    } else {
      GameLobbyPage.isLobbyJoined = true;

      this.socket.emit('requestUserList');
      console.log(this.user);
    }

  }

  ionViewWillEnter() {
    this.registerEvents();
  }

  //unsubscribe from all events to prevent multiple subscriptions on re-entering
  ionViewWillLeave() {
    GameLobbyPage.isLobbyJoined = false;
    this.events.forEach((event) => {
      event.unsubscribe();
    })
  }


  private usersChanged() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', function (data) {
        observer.next(data);
      })
    })
    return observable;
  }

  private showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  private onAdminPromotion() {
    let observable = new Observable(observer => {
      this.socket.on('adminPromotion', function (data) {
        observer.next(data);
      })
    })
    return observable;
  }


  waitForStart() {
    let observable = new Observable(observer => {
      this.socket.on('gameStarted', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  startGame() {
    this.socket.emit('startGame')
  }

  exitLobby() {
    this.socket.emit('leaveRoom');
    this.navCtrl.setRoot('JoinSessionPage');
  }

}
