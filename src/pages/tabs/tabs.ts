import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the JoinOrCreatePage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-join-or-create',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  joinSessionRoot = 'JoinSessionPage'
  createSessionRoot = 'CreateSessionPage'


  constructor(public navCtrl: NavController) {}

}
