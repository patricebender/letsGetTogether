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
    icon: '',
    isAdmin: false
  }



  room = '';

  constructor(public navCtrl: NavController, private socket: Socket) {
  }

  joinRoomRequest() {
    this.socket.connect();
    this.roomJoined();
    this.socket.emit('joinRoomRequest', {user: this.user, room: this.room})
  }

  roomJoined() {
      this.socket.on('roomJoinSucceed', (data) => {
        console.log(data.user);
        this.navCtrl.push('GameLobbyPage', { user: data.user, room: data.room});
      })


  }

}
