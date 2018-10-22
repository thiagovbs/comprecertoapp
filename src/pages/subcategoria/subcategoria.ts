import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-subcategoria',
  templateUrl: 'subcategoria.html',
})
export class SubcategoriaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoriaPage');
  }

  
  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }

}
