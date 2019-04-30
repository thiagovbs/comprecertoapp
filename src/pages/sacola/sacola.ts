import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, App } from 'ionic-angular';
import { CarrinhoItem } from '../../models/carrinho-item.model';
import { CarrinhoService } from '../../services/carrinho.service';




@IonicPage()
@Component({
  selector: 'page-sacola',
  templateUrl: 'sacola.html',
})
export class SacolaPage implements OnInit {

  produtos: CarrinhoItem[];
  categorias: Array<string> = []
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private carrinhoService: CarrinhoService,
    public events: Events,
    public viewCtrl: ViewController,
    public appCtrl: App) {

      

  }

  ngOnInit() {

    this.produtos = this.carrinhoService.items

    //mapeia os produtos e adiciona as categorias dos produtos dentro de um array
    this.produtos.map((teste) => {
      this.categorias.push(teste.categoriaNome.toUpperCase())
    })
    //filtra o array para que não haja categorias repetidas
    this.categorias = this.categorias.filter((el, i, a) => i === a.indexOf(el))

    //evento para de disparar o evento de deletar
    this.events.unsubscribe('deletar')

    

  }

  onSearch() {
    this.navCtrl.push('PesquisaPage')
  }

  total(): number {
    return this.carrinhoService.total();
  }

  onCompraFacil() {
    this.navCtrl.push('CompreFacilPage', {
      produtos_sacola: this.produtos,
      valorTotal: this.total()
    })
  }
}

