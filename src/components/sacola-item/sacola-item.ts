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
    console.log(this.itens)
    
  }

    //diminui a quantidade de produtos
    diminuiQnt(item:CarrinhoItem) {
      this.carrinhoService.diminuiQntCarrinho(item);
    }
  
    //aumenta quantidade de produtos
    aumentaQnt(item:CarrinhoItem) {
      this.carrinhoService.aumentaQnt(item);
    }
}
