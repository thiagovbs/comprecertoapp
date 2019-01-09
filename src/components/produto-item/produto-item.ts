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

  carrinhoItems: CarrinhoItem[]
  carrinhoItem: CarrinhoItem
  

  foundItem:CarrinhoItem


  constructor(private carrinhoService: CarrinhoService) {
    this.carrinhoItem = carrinhoService.carrinhoItem
  }

  ngOnInit() {

    if (this.items().length !== 0) {
    }
  }

  items(): any[] {
    return this.carrinhoService.items;
  }

  //diminui a quantidade de produtos
  diminuiQnt(item: Produto): void {
    
    console.log("Esse é o Item"+ item)
    this.carrinhoService.diminuiQnt(item);

  }

  RemoveProdutoCarrinho(){
    this.carrinhoService.removeItem(this.foundItem)
  }

  //aumenta quantidade de produtos
  aumentaQnt(item: Produto) {
     this.carrinhoService.addItem(item);
  }

  //adiciona produto no carrinho
  addCarrinho(item: Produto): void {
    
    this.carrinhoService.addItem(item);
  }

  //Verifica se produto existe no carrinho para alterar a tela 
  verificaProdutoNoCarrinho(item: Produto):boolean {
    this.foundItem = this.items().find((produtoItem) => produtoItem.produto.idProduto === item.idProduto)
    return this.foundItem ? true : false;
  }

}
