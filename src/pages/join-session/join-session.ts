import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  Platform,
  ToastController
} from 'ionic-angular';
import {Socket} from "ng-socket-io";
import {Observable} from "rxjs";
import {Settings} from "../settings";
import {Device} from "@ionic-native/device";
import {TabsPage} from "../tabs/tabs";

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


  constructor(private device: Device, public toastCtrl: ToastController, public navCtrl: NavController, private socket: Socket, public alertCtrl: AlertController,public plt: Platform, public loadingCtrl: LoadingController) {
  console.log(this.device.platform)
    Settings.listenForReconnection(socket, plt, loadingCtrl, navCtrl);
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
    Settings.listenForUserChanges(this.socket);

    if (!this.user.name || !this.user.avatar) {
      Settings.initRandomUser(this.socket, this.device);
      Settings.listenForUserChanges;
    }
  }

  ionViewWillLeave() {
    this.events.forEach((event) => {
      event.unsubscribe();
    })
  }

  joinRoomRequest(roomName) {
    this.socket.emit('joinRoomRequest', {user: this.user, room: roomName ? roomName : this.room})
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
    let roomJoinSuccessEvent = this.onRoomFound().subscribe((data) => {
      Settings.isGameStarted = true;
      Settings.game = data['game'];
      this.navCtrl.setRoot(TabsPage);
    });

    let noSuchRoomEvent = this.onNoRoomFound().subscribe((data) => {
      this.showToast('No room found, create one instead!')
    })

    this.events.push(roomJoinSuccessEvent, noSuchRoomEvent);
  }


  goToCreateRoom() {
    this.navCtrl.push('CreateSessionPage');
  }

  goToUserSettings() {
    this.navCtrl.push('UserPage');
  }

  private showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  showJoinGameAlert() {
    let alert = this.alertCtrl.create({
      title: 'Join Game',
      inputs: [
        {
          name: 'roomName',
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
        },
        {
          text: 'Beitreten',
          handler: data => {
            if (data.roomName === "") {
              this.presentInputNotValid('Raum Name darf nicht leer sein!')
              return false;
            } else {
              this.joinRoomRequest(data.roomName);
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

