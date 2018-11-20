import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, Tabs, ToastController} from 'ionic-angular';
import {Settings} from "../settings";
import {Socket} from "ng-socket-io";
import {Observable} from "rxjs";

/**
 * Generated class for the JoinOrCreatePage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  //Events which should be listened for across all tabs
  private events = [];


  gameRoot = 'GamePage'
  playerOverviewRoot = 'PlayerOverviewPage';
  gameOverviewRoot = 'GameOverviewPage'

  @ViewChild('myTabs') tabRef: Tabs;


  ionViewWillEnter() {
    this.tabRef.select(0);
  }


  get isGameStarted() {
    return Settings.isGameStarted;
  }

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private socket: Socket) {
  }

  ionViewDidEnter() {
    this.registerEvents();
  }

  ionViewWillLeave() {
    this.events.forEach((event) => {
      event.unsubscribe();
    })
  }

  private showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.setPosition("top");
    toast.present();
  }

  private registerEvents() {

    let userChangeEvent = this.onUserChange().subscribe((data) => {
      this.showToast(data['user'].name + " has " + data['event'] + " the room")
    });

    Settings.listenForGameUpdates(this.socket);
    this.events.push(userChangeEvent);

  }

  private onUserChange() {
    return new Observable((observer) => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
  }
}
