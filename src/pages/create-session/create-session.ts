import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Settings} from "../settings";
import {Socket} from "ng-socket-io";
import {Observable} from "rxjs";
import {Device} from "@ionic-native/device";
import {TabsPage} from "../tabs/tabs";

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


  get room() {
    return Settings.room
  }

  set room(name) {
    Settings.room = name;
  }

  get selectedCategories() {
    return Settings.selectedCategories;
  }

  get selectedThemes() {
    return Settings.selectedThemes;
  }

  get cardsPerGame() {
    return Settings.game.cardsPerGame;
  }

  set cardsPerGame(count) {
    Settings.game.cardsPerGame = count;
  }

  get user() {
    return Settings.user;
  }

  constructor(private device: Device, private toastCtrl: ToastController, private socket: Socket, private alertCtrl: AlertController, private navCtrl: NavController, public navParams: NavParams) {
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
      handler: () => {
        let i = 0;
        for (let box of alert.data.inputs) {

          Settings.categories[i].enabled = box.checked;
          i++;
        }
      }
    });

    alert.present();
  }

  chooseThemes() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose the Themes for your cards');

    for (let theme of Settings.themes) {
      alert.addInput({
        type: 'checkbox',
        label: theme.name,
        value: "",
        checked: theme.enabled
      });
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: () => {
        let i = 0;
        for (let box of alert.data.inputs) {
          Settings.themes[i].enabled = box.checked;
          i++;
        }
      }
    });

    alert.present();
  }

  ionViewWillEnter() {
    if (!this.user.name || !this.user.avatar) {
      Settings.initRandomUser(this.socket, this.device);
      Settings.listenForUserChanges;
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
    this.socket.emit('createRoomRequest', {
      user: this.user,
      room: this.room,
      categories: this.selectedCategories,
      themes: this.selectedThemes,
      cardsPerGame: this.cardsPerGame,
    });
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
      Settings.isGameStarted = true;
      Settings.game = data['game'];

      this.navCtrl.setRoot(TabsPage);
    })


    let roomAlreadyExistsEvent = this.onRoomAlreadyExists().subscribe((data) => {
      this.showToast("Room already exists!");
    });

    this.events.push(roomCreatedEvent, roomAlreadyExistsEvent);
  }

  goToUserSettings() {
    this.navCtrl.push('UserPage')
  }

  private showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
