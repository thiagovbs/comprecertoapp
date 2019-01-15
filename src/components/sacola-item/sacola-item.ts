import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CarrinhoItem } from '../../models/carrinho-item.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { Events, NavController, App } from 'ionic-angular';


@Component({
  selector: 'sacola-item',
  templateUrl: 'sacola-item.html'
})
export class SacolaItemComponent implements OnInit {

  @Input() categoria: string
  @Input() items: CarrinhoItem[];

  @Output() filterProdutos: EventEmitter<CarrinhoItem[]>;

  constructor(private navCtrl: NavController,
    private carrinhoService: CarrinhoService,
    public events: Events, public appCtrl: App) {
  }
  ngOnInit() {
    //Evento do botão de deletar, para dar um reaload na página
    this.events.subscribe('deletar', () => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);

    })


    console.log("entrei no onOnit do sacola-item")
    this.items = this.items.filter((carrinho) => {
      return carrinho.categoriaNome.toUpperCase() == this.categoria ? this.items : ''
    })
  }


  //diminui a quantidade de produtos
  diminuiQnt(item: CarrinhoItem) {
    this.carrinhoService.diminuiQntCarrinho(item);
  }

  //aumenta quantidade de produtos
  aumentaQnt(item: CarrinhoItem) {
    this.carrinhoService.aumentaQnt(item);

  }

 
}
