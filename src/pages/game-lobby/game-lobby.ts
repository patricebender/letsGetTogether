import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import {Socket} from 'ng-socket-io';
import {Observable} from "rxjs";
import {GamePage} from "../game/game";
import {TabsPage} from "../tabs/tabs";

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

  room = '';

  user = {
    name: '',
    icon: '',
    isAdmin: false
  }
  otherUsers = [];
  events = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {

  }

  registerEvents() {
    let userEvent = this.usersChanged().subscribe((data) => {
      this.showToast(data['user'].name + " " + data['event']);
    })

    let adminEvent = this.onAdminPromotion().subscribe(() => {
      this.showToast("You are the new Admin");
      this.user.isAdmin = true;
    })

    let waitForStart = this.waitForStart().subscribe((data) => {
      this.navCtrl.setRoot(TabsPage);
    })

    let waitForClientList = this.receiveClientList().subscribe((data) => {
      this.otherUsers = data['userList'];
    });


    this.events.push(userEvent, adminEvent, waitForStart, waitForClientList);
  }


  ionViewDidEnter() {

    this.user = this.navParams.get('user');
    this.room = this.navParams.get('room');
    GameLobbyPage.isLobbyJoined = true;
    this.registerEvents();
    this.socket.emit('requestUserList');
  }

  //unsubscribe from all events to prevent multiple subscriptions on re-entering
  ionViewWillLeave() {
    GameLobbyPage.isLobbyJoined = false;
    this.events.forEach((event) => {
      event.unsubscribe();
    })
  }

  private receiveClientList() {
    return new Observable(observer => {
      this.socket.on('receiveUserList', (data) => {
        observer.next(data);
      })
    });
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
    this.socket.disconnect();
    this.navCtrl.setRoot('JoinSessionPage');
  }
}
