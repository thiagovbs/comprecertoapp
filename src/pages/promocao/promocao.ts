import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-promocao',
  templateUrl: 'promocao.html',
})
export class PromocaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }

}
