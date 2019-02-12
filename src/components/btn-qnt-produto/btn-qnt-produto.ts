import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';
import { CarrinhoItem } from '../../models/carrinho-item.model';

@Component({
  selector: 'btn-qnt-produto',
  templateUrl: 'btn-qnt-produto.html'
})
export class BtnQntProdutoComponent implements OnInit {

  @Input() itemFound:CarrinhoItem
  @Input() nomePage:string
  
  @Output() add = new EventEmitter<any>()
  @Output() sub = new EventEmitter<any>()
  
  constructor(private carrinhoService: CarrinhoService) {
  }

  ngOnInit() {
    console.log(this.nomePage)
  }

  //aumenta quantidade de produtos
  emitAddevent() {
      console.log(this.itemFound)
      this.add.emit()
   }

   emitSubEvent(){
    this.sub.emit()
  }

   RemoveProdutoCarrinho(){
     if(this.nomePage =="Sacola"){
      this.carrinhoService.removeItemCarrinho(this.itemFound)
      
     }else{
      this.carrinhoService.removeItem(this.itemFound)
     }
    
  }
}
