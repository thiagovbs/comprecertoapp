import { Component, Input, OnInit } from '@angular/core';
import { CarrinhoItem } from '../../models/carrinho-item.model';

@Component({
  selector: 'sacola-item',
  templateUrl: 'sacola-item.html'
})
export class SacolaItemComponent implements OnInit{

@Input() itens:CarrinhoItem[];

  constructor() {
  }

  ngOnInit(){
    console.log(this.itens)
  }

}
