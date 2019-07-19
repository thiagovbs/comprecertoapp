import { Component, Input } from '@angular/core';
import { CompraFacilService } from '../../../services/compra-facil.service';
import { UsuarioService } from '../../../services/usuario.service';
import { CarrinhoItem } from '../../../models/carrinho-item.model';

@Component({
  selector: 'wizard-pedido-finalizado',
  templateUrl: 'wizard-pedido-finalizado.html'
})
export class WizardPedidoFinalizadoComponent {

  text: string;
  @Input() infoMercado:any;
  @Input() infoPessoal:any;
  @Input() produtos:any;
  @Input() enderecoPedido:any;

  constructor(private compraFacilService: CompraFacilService, private usuarioService:UsuarioService) {
    
  }

  ionViewDidLoad(){
    
  }

  
  getValorTotalPorProduto(produto:CarrinhoItem):number{
    return  produto.produto.precoMercadoProduto * produto.quantidade;  
 }

  getEnderecoPedido(){
    console.log(this.compraFacilService.getEnderecoPedidoUsuario());
  }

  entregaOuRetirada(evento){
    if(evento === "E"){
      return "Entrega"
    }else{
      return "Retirada"
    }
  }

  tipoPagamento(evento){
    if(evento === "E"){
      return "Dinheiro"
    }else if(evento === "D"){
      return "Débito"
    }else{
      return "Crédito"
    }
  }
}
