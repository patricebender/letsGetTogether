import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import {Socket} from 'ng-socket-io';
import {Observable} from "rxjs";
import {GamePage} from "../game/game";

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

  room = '';
  user = {
    name: '',
    icon: '',
    isAdmin: false
  }
  otherUsers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
    this.user = navParams.get('user');
    this.room = navParams.get('room');

    this.usersChanged().subscribe((data) => {
      this.showToast(data['user'].name + " " + data['event']);
    })

    this.onAdminPromotion().subscribe(() => {
      this.showToast("You are the new Admin");
      this.user.isAdmin = true;
    })

    this.receiveClientList();
    this.waitForStart();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameLobbyPage');
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  private receiveClientList() {
    this.socket.emit('requestUserList');
    this.socket.on('receiveUserList', (data) => {
      this.otherUsers = data.userList;
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

  startGame() {
    this.socket.emit('startGame')
  }

  waitForStart() {
    this.socket.on('gameStarted', (data) => {
        this.navCtrl.setRoot(GamePage);
      });

  }
}
