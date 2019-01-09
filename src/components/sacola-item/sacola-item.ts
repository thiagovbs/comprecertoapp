import { Component, Input, OnInit } from '@angular/core';
import { CarrinhoItem } from '../../models/carrinho-item.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'sacola-item',
  templateUrl: 'sacola-item.html'
})
export class SacolaItemComponent implements OnInit{

@Input() itens:CarrinhoItem[];

  constructor(private carrinhoService: CarrinhoService) {
    
  }

  ngOnInit(){
    //this.quantidadeItems = this.carrinhoService.quantidadeItems; 
    console.log(this.itens)
  }

    //diminui a quantidade de produtos
    diminuiQnt(item:CarrinhoItem) {
      console.log(item)
      //this.qtd_produto.quantidade = this.qtd_produto.quantidade - 1;
  
    }
  
    //aumenta quantidade de produtos
    aumentaQnt(item:Produto) {
      this.carrinhoService.addItem(item);
      //this.quantidadeItems = this.carrinhoService.quantidadeItems;  
    }

  

}
