import {ViewController} from "ionic-angular";
import {Component} from "@angular/core";
import {Settings} from "../../settings";

@Component({
  template: `
    <ion-list>
      <ion-row *ngFor="let curse of curses" >
        <div padding *ngIf="curse.category === 'multiplierCurse'">
         Dein Multiplikator ist noch für <b>{{curse.roundsLeft === 1? 'eine Runde' : curse.roundsLeft + ' Runden'}}</b> um <b>{{curse.multiplier}}</b> erhöht. 
        </div>
      </ion-row>
    </ion-list>
  `
})
export class CurseOverviewPage {
  constructor(public viewCtrl: ViewController) {
  }


  get curses() {
    return Settings.user.curses;
  }
}
