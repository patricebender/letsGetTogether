import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Settings} from "../settings";
import {Socket} from "ngx-socket-io";

/**
 * Generated class for the GameSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game-settings',
  templateUrl: 'game-settings.html',
})
export class GameSettingsPage {

  get room() {
    return Settings.room;
  }

  get user() {
    return Settings.user;
  }

  get selectedCategories() {
    return Settings.selectedCategories;
  }

  get selectedThemes() {
    return Settings.selectedThemes;
  }

  constructor(private socket: Socket, private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameSettingsPage');
  }


  ionViewDidEnter() {
    if (!this.user.name) {
      this.navCtrl.setRoot('JoinSessionPage');
    }
  }

  chooseCategories() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Welche Karten sollen gespielt werden?');

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
        this.socket.emit('categoriesChanged', {categories: Settings.categories})
      }
    });

    alert.present();
  }

  chooseThemes() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Ändere die Themen des Spiels');
    alert.setCssClass('alert');

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
        this.socket.emit('themesChanged', {themes: Settings.themes})

      }
    });

    alert.present();
  }


}
