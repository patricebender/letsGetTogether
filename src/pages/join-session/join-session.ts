import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, ToastController} from 'ionic-angular';
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


  constructor(public toastCtrl: ToastController, public navCtrl: NavController, private socket: Socket, public alertCtrl: AlertController) {
  }


  get selectedCategories() {
    return Settings.selectedCategories;
  }


  get user() {
    return Settings.user;
  }

  get room() {
    return Settings.room;
  }

  set room(name) {
    Settings.room = name;
  }


  ionViewWillEnter() {
    this.registerEvents();
    if (!this.user.name) {

      this.socket.emit('requestAvatarList');
      this.socket.on('receiveAvatarList', (data) => {
        let avatarFileNames = data.avatarFileNames;
        if (avatarFileNames) {
          Settings.avatarFileNames = avatarFileNames;
          //init random user
          Settings.initRandomUser(this.socket);
        }
      })
    }
  }

  ionViewWillLeave() {
    this.events.forEach((event) => {
      event.unsubscribe();
    })
  }

  joinRoomRequest() {
    this.socket.emit('joinRoomRequest', {user: this.user, room: this.room})
  }

  onRoomFound() {

    let observable = new Observable(observer => {
      this.socket.on('roomJoinSucceed', (data) => {
        observer.next(data);
      })
    })
    return observable;

  }


  onNoRoomFound() {
    let observable = new Observable(observer => {
      this.socket.on('noSuchRoom', (data) => {
        observer.next(data);
      })
    })
    return observable;
  }

  private registerEvents() {
    let roomJoinEvent = this.onRoomFound().subscribe((data) => {
      this.navCtrl.setRoot('GameLobbyPage');
    });

    let noSuchRoomEvent = this.onNoRoomFound().subscribe((data) => {
      this.showToast('No room found, create one instead!')
    })

    let updateUserEvent = this.onUpdateUser().subscribe((data) => {
      console.log("updating user: " + data['user']);
      Settings.updateUser(data['user']);
    })

    this.events.push(roomJoinEvent, noSuchRoomEvent, updateUserEvent);
  }


  goToCreateRoom() {
    this.navCtrl.push('CreateSessionPage');
  }

  goToUserSettings() {
    this.navCtrl.setRoot('UserPage');
  }

  private showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  private onUpdateUser() {
    return new Observable(observer => {
      this.socket.on('updateUser', (data) => {
        observer.next(data);
      })
    })
  }
}

