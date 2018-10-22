import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-politica-privacidade',
  templateUrl: 'politica-privacidade.html',
})
export class PoliticaPrivacidadePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }

}
