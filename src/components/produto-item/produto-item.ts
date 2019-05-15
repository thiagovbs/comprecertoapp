import { Component, Input, OnInit } from '@angular/core';

import { Mercado } from '../../models/supermercado.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { CarrinhoItem } from '../../models/carrinho-item.model';
import { MercadoProduto } from '../../models/mercado-produto.model';
import { API_CONFIG } from '../../config/api.config';
import { SupermercadoService } from '../../services/supermercado.service';

@Component({
  selector: 'produto-item',
  templateUrl: 'produto-item.html'
})
export class ProdutoItemComponent implements OnInit {

  @Input('produto-itens') produtos: MercadoProduto;
  
  @Input() nomeCategoria: string
  @Input() possuiMercadoNome: boolean;

  carrinhoItems: CarrinhoItem[]
  carrinhoItem: CarrinhoItem

  foundItem: CarrinhoItem
  somaProduto: number
  bucketS3: string
  dtValidade: Date = null;



  constructor(private carrinhoService: CarrinhoService, private mercadoService: SupermercadoService) {
    this.carrinhoItem = carrinhoService.carrinhoItem
  }

  ngOnInit() {
    
    this.bucketS3 = API_CONFIG.s3Url;
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

  getMercado(produto) {
    console.log(produto)
  }

  setSomaValor(produto: MercadoProduto): number {
    if (this.foundItem) {
      return this.somaProduto = this.foundItem.quantidade * produto.precoMercadoProduto;

    }
    return this.somaProduto = 0;
  }

 
}
