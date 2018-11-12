import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Settings} from "../settings";
import {Socket} from "ng-socket-io";
import {Observable} from "rxjs";

/**
 * Generated class for the CreateSessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-session',
  templateUrl: 'create-session.html',
})
export class CreateSessionPage {
  private events = [];


  get room(){
    return Settings.room
  }

  set room(name) {
    Settings.room = name;
  }

  get selectedCategories(){
    return Settings.selectedCategories;
  }

  get user() {
    return Settings.user;
  }

  constructor(private toastCtrl: ToastController,private socket: Socket, private alertCtrl: AlertController, private navCtrl: NavController, public navParams: NavParams) {
  }

  chooseCategories() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose the Categories you want to play');

    for (let category of Settings.categories) {
      alert.addInput({
        type: 'checkbox',
        label: category.name,
        value: "",
        checked: category.enabled
      });
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: (data: any) => {
        let i = 0;
        for (let box of alert.data.inputs) {

          Settings.categories[i].enabled = box.checked;
          i++;
        }
      }
    });

    alert.present();
  }

  ionViewWillEnter() {
    if(!this.user.name){

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

  ionViewDidEnter() {
    this.registerEvents();
  }

  ionViewWillLeave() {
    this.events.forEach((event) => {
      event.unsubscribe();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSessionPage');
  }

  createRoomRequest() {
    this.socket.emit('createRoomRequest', {user: this.user, room: this.room, settings: { categories: this.selectedCategories}});
  }

  onRoomCreated() {

    let observable = new Observable(observer => {
      this.socket.on('roomCreated', (data) => {
        observer.next(data);
      })
    })
    return observable;

  }


  onRoomAlreadyExists() {
    let observable = new Observable(observer => {
      this.socket.on('roomAlreadyExists', (data) => {
        observer.next(data);
      })
    })
    return observable;
  }

  private registerEvents() {
    let roomCreatedEvent = this.onRoomCreated().subscribe((data) => {
      this.navCtrl.setRoot('GameLobbyPage');
    })

    let updateUserEvent = this.onUpdateUser().subscribe((data) => {
      console.log("updating user: " + data['user']);
      Settings.updateUser(data['user']);
    })

    let roomAlreadyExistsEvent = this.onRoomAlreadyExists().subscribe((data) => {
      this.showToast("Room already exists!");
    });

    this.events.push(roomCreatedEvent, roomAlreadyExistsEvent, updateUserEvent);
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
