import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-politica-privacidade-detail',
  templateUrl: 'politica-privacidade-detail.html',
})
export class PoliticaPrivacidadeDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoliticaPrivacidadeDetailPage');
  }

}
