import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-sacola',
  templateUrl: 'sacola.html',
})
export class SacolaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }

}
