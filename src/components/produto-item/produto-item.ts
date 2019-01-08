import { Component, Input, OnInit } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { Supermercado } from '../../models/supermercado.model';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'produto-item',
  templateUrl: 'produto-item.html'
})
export class ProdutoItemComponent implements OnInit {

  @Input('produto-itens') produtos: Produto[];
  @Input('mercado-itens') mercado: Supermercado

  qtd_produto: number = 1;
  produto: Produto;

  constructor(private carrinhoService: CarrinhoService) {

  }

  ngOnInit() {

  }

  //retorna os produtos do carrinho
  items(): any[] {
    return this.carrinhoService.items;
  }

  //diminui a quantidade de produtos
  diminuiQnt(item: Produto) {
    this.qtd_produto = this.qtd_produto - 1;

  }

  //aumenta quantidade de produtos
  aumentaQnt(item: Produto) {
    this.qtd_produto = this.qtd_produto + 1;
  }

  //adiciona produto no carrinho
  addCarrinho(item: Produto) {
    this.verificaProdutoNoCarrinho(item)
    this.carrinhoService.addItem(item);
  }

  //Verifica produto para alterar a tela 
  verificaProdutoNoCarrinho(item: Produto): boolean {
    let achouItem: boolean = true;
    let verificaItems = this.items();

    let foundItem = verificaItems.find((produtoItem) => produtoItem.produto.idProduto === item.idProduto)
    if (foundItem) {
      achouItem = true;
      return achouItem;
    }
    achouItem = false;
    return achouItem;
  }



}
