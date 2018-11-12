import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {Socket} from "ng-socket-io";
import {Observable} from "rxjs";
import {Settings} from "../settings";

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




  events = [];

  room=''

  constructor(public navCtrl: NavController, private socket: Socket,public alertCtrl: AlertController) {
  }




  get selectedCategories() {
    return Settings.selectedCategories;
  }
  get user(){
    return Settings.user;
  }



  ionViewDidEnter() {
    this.socket.connect();
    this.registerEvents();
  }

  ionViewWillLeave() {
    this.events.forEach((event) => {
      event.unsubscribe();
    })
  }

  joinRoomRequest() {
    this.socket.emit('joinRoomRequest', {user: Settings.user, room: this.room})
  }

  roomJoined() {

    let observable = new Observable(observer => {
      this.socket.on('roomJoinSucceed', (data) => {
        observer.next(data);
      })
    })
    return observable;

  }



  private registerEvents() {
    let roomJoinEvent = this.roomJoined().subscribe((data) => {
      this.navCtrl.setRoot('GameLobbyPage', {socket: this.socket, user: data['user'], room: data['room']});
    });

    this.events.push(roomJoinEvent);
  }

  createGameRequest() {
    console.log(Settings.selectedCategories)
  }

  goToCreateRoom() {
    this.navCtrl.push('CreateSessionPage');
  }
}

