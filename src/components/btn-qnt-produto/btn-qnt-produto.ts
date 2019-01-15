import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { CarrinhoItem } from '../../models/carrinho-item.model';

@Component({
  selector: 'btn-qnt-produto',
  templateUrl: 'btn-qnt-produto.html'
})
export class BtnQntProdutoComponent{

  @Input() itemFound:CarrinhoItem
  
  @Output() add = new EventEmitter<any>()
  @Output() sub = new EventEmitter<any>()
  @Output() remove = new EventEmitter<any>()
  constructor(private carrinhoService: CarrinhoService) {
  }



  //aumenta quantidade de produtos
  emitAddevent() {
      this.add.emit()
   }

   emitSubEvent(){
    this.sub.emit()
  }

   RemoveProdutoCarrinho(){
    this.carrinhoService.removeItem(this.itemFound)
  }
}
