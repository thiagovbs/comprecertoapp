import { Component, Output, EventEmitter } from '@angular/core';
import { SubstituicaoPedidoEnum } from '../../../models/substituicao-pedido-enum.model';


@Component({
  selector: 'wizard-msg-step-1',
  templateUrl: 'wizard-msg-step-1.html'
})
export class WizardMsgStep_1Component {

  substituicaoPedidoEnum = SubstituicaoPedidoEnum
  @Output() substituicaoPedido = new EventEmitter();
  
  constructor() {

  }
  getSubstituicaoEnum() {
    return Object.keys(this.substituicaoPedidoEnum)
  }

  tipoSubstituicao(evento) {  
    this.substituicaoPedido.emit(evento)
  }

}
