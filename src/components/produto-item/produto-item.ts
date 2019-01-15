import { Component, Input, OnInit } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { Supermercado } from '../../models/supermercado.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { CarrinhoItem } from '../../models/carrinho-item.model';

@Component({
  selector: 'produto-item',
  templateUrl: 'produto-item.html'
})
export class ProdutoItemComponent implements OnInit {

  @Input('produto-itens') produtos: Produto[];
  @Input('mercado-itens') mercado: Supermercado;
  @Input() nomeCategoria:string

  carrinhoItems: CarrinhoItem[]
  carrinhoItem: CarrinhoItem
  
  foundItem:CarrinhoItem


  constructor(private carrinhoService: CarrinhoService) {
    this.carrinhoItem = carrinhoService.carrinhoItem
  }

  ngOnInit() {
  }

  //retorna todos os items no carrinho
  items(): CarrinhoItem[] {
    return this.carrinhoService.items;
  }

  //diminui a quantidade de cada produto
  diminuiQnt(item: Produto): void {
    console.log("Esse é o Item"+ item)
    this.carrinhoService.diminuiQnt(item);
  }

  //remove o produto do carrinho
  RemoveProdutoCarrinho(){
    this.carrinhoService.removeItem(this.foundItem)
  }

  //aumenta quantidade de cada produto
  aumentaQnt(item: Produto) {
     this.carrinhoService.addItem(item);
  }

  //adiciona produto no carrinho
  addCarrinho(item: Produto): void {
    this.carrinhoService.addItem(item, this.nomeCategoria);
  }

  //Verifica se produto existe no carrinho 
  verificaProdutoNoCarrinho(item: Produto):boolean {
    this.foundItem = this.items().find((produtoItem) => produtoItem.produto.idProduto === item.idProduto)
    return this.foundItem ? true : false;
  }

}
