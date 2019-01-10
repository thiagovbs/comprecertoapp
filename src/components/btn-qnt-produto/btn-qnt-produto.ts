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

  constructor(private carrinhoService: CarrinhoService) {
  }

  //aumenta quantidade de produtos
  emitAddevent(item: Produto) {
      this.add.emit(item)
   }

   emitSubEvent(){
    this.sub.emit()
  }

   RemoveProdutoCarrinho(){
    console.log(this.itemFound)
    this.carrinhoService.removeItem(this.itemFound)
  }
}
