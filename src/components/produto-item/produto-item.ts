import { Component, Input, OnInit } from '@angular/core';

import { CarrinhoService } from '../../services/carrinho.service';
import { CarrinhoItem } from '../../models/carrinho-item.model';
import { MercadoProduto } from '../../models/mercado-produto.model';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'produto-item',
  templateUrl: 'produto-item.html'
})
export class ProdutoItemComponent implements OnInit {

  @Input('produto-itens') produtos: MercadoProduto[];

  @Input() nomeCategoria: string
  @Input() possuiMercadoNome: boolean;

  carrinhoItems: CarrinhoItem[]
  carrinhoItem: CarrinhoItem

  foundItem: CarrinhoItem
  somaProduto: number
  bucketS3: string
  dtValidade: Date = null;



  constructor(private carrinhoService: CarrinhoService, public navCtrl: NavController) {
    this.carrinhoItem = carrinhoService.carrinhoItem
  }

  ngOnInit() {

  }

  //retorna todos os items no carrinho
  items(): CarrinhoItem[] {
    return this.carrinhoService.items;
  }

  //diminui a quantidade de cada produto
  diminuiQnt(item: MercadoProduto): void {
    console.log(item)
    this.carrinhoService.diminuiQnt(item);
  }

  //aumenta quantidade de cada produto
  aumentaQnt(item: MercadoProduto) {
    this.carrinhoService.addItem(item);
  }

  //adiciona produto no carrinho
  addCarrinho(item: MercadoProduto): void {
    this.carrinhoService.addItem(item, item.nomeCategoria);
  }

  //Verifica se produto existe no carrinho 
  verificaProdutoNoCarrinho(item: MercadoProduto): boolean {
    this.foundItem = this.items().find((produtoItem) => produtoItem.produto.idMercadoProduto === item.idMercadoProduto)
    return this.foundItem ? true : false;
  }


  setSomaValor(produto: MercadoProduto): number {
    if (this.foundItem) {
      return this.somaProduto = this.foundItem.quantidade * produto.precoMercadoProduto;

    }
    return this.somaProduto = 0;
  }

  sendToMercado(mercadoProduto: MercadoProduto) {
    console.log(mercadoProduto)
    let sedMercado: { idMercado: number, nomeFantasia: string } = { idMercado: mercadoProduto.idMercado, nomeFantasia: mercadoProduto.nomeFantasiaMercado }
    this.navCtrl.push("SupermercadoDetalhePage", {
      mercado: sedMercado
    });
  }

  getProdutoToCaptalized(nomeProduto: string, marcaProduto: string) {
    return nomeProduto.toLowerCase() + " " + marcaProduto.toLowerCase();
  }

}
