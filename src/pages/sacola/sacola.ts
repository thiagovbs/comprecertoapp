import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarrinhoItem } from '../../models/carrinho-item.model';
import { CarrinhoService } from '../../services/carrinho.service';


@IonicPage()
@Component({
  selector: 'page-sacola',
  templateUrl: 'sacola.html',
})
export class SacolaPage{


  produtos:CarrinhoItem[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private carrinhoService:CarrinhoService) {
  }


  ionViewWillEnter() {
    this.produtos = this.carrinhoService.items;
  }

  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }

  

}
