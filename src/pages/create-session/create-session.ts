import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Settings} from "../settings";

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



  constructor(private alertCtrl: AlertController, navCtrl: NavController, public navParams: NavParams) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSessionPage');
  }

}
