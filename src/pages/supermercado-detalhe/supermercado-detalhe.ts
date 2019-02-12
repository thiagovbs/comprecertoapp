import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Supermercado } from '../../models/supermercado.model';


@IonicPage()
@Component({
  selector: 'page-supermercado-detalhe',
  templateUrl: 'supermercado-detalhe.html',
})
export class SupermercadoDetalhePage {


  mercado:Supermercado
  mercadoNome: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.mercado = this.navParams.get('mercado');
    this.mercadoNome = this.mercado.nomeFantasia
    console.log(this.mercadoNome)
  }

  
  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }

}
