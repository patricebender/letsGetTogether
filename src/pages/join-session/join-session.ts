import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {Socket} from "ng-socket-io";

/**
 * Generated class for the JoinSessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-join-session',
  templateUrl: 'join-session.html',
})
export class JoinSessionPage {

  user = {
    name: '',
    icon: '',
    isAdmin: false
  }



  room = '';

  constructor(public navCtrl: NavController, private socket: Socket) {
  }

  ionViewDidLoad() {
    this.socket.connect();
  }

  joinRoomRequest() {

    this.roomJoined();
    this.socket.emit('joinRoomRequest', {user: this.user, room: this.room})
  }

  roomJoined() {
    this.socket.on('roomJoinSucceed', (data) => {
      console.log(data.user);
      this.navCtrl.setRoot('GameLobbyPage', { user: data.user, room: data.room});
    })


  }

}

