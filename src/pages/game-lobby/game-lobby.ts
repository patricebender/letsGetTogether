import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Socket } from 'ng-socket-io';
import {Observable} from "rxjs";

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
  user = {};
  otherUsers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
    this.user = navParams.get('user');
    this.room = navParams.get('room');

    this.usersChanged().subscribe( (data) => {
      this.showToast(data['user'].name + " " + data['event']);
    })


    this.receiveClientList();
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
      console.log(data);
    })
  }

  private usersChanged() {
    let observable = new Observable( observer => {
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

}
