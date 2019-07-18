import { Component, Input } from '@angular/core';

@Component({
  selector: 'wizard-pedido-finalizado',
  templateUrl: 'wizard-pedido-finalizado.html'
})
export class WizardPedidoFinalizadoComponent {

  text: string;
  @Input() infoMercado:any;
  @Input() infoPessoal:any;
  @Input() produtos:any;

  constructor() {
    
  }

  ionViewDidLoad(){
    
  }

}
