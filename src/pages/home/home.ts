import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Socket } from 'ng-socket-io';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  user = {
    name: '',
    icon: ''
  }

  room = '';

  constructor(public navCtrl: NavController, private socket: Socket) {
    this.roomJoined();
  }

  joinRoomRequest() {
    this.socket.connect();
    this.socket.emit('joinRoomRequest', {user: this.user, room: this.room})
  }

  roomJoined() {
      this.socket.on('roomJoinSucceed', () => {
        this.navCtrl.push('GameLobbyPage', { user: this.user, room: this.room});
      })


  }

}
