import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagamentoEnum } from '../../../models/pagamento-enum.model';
import { Events } from 'ionic-angular';

@Component({
  selector: 'wizard-tipo-pagamento',
  templateUrl: 'wizard-tipo-pagamento.html'
})
export class WizardTipoPagamentoComponent {


  @Output() infoTipoPagamento = new EventEmitter();

  @Input() valorTotalPedido:number;

  pagamentoForm: FormGroup
  tipo: any
  tipoPagamentoEnum = PagamentoEnum
  isTroco: boolean = false;
  pagamento: { tipo: string, troco: number } = { tipo: undefined, troco: 0 }
  stepCondition:any
  constructor(private formBuilder: FormBuilder,
    private events: Events) {

    this.pagamentoForm = this.formBuilder.group({
      troco: this.formBuilder.control('')
    })

    this.events.subscribe('step:next', () => {
      this.pagamentoSubmit()
    });
    console.log(this.valorTotalPedido)
  }

  ionViewDidLoad(){
    
  }

  getTipoPagamentoEnum() {
    return Object.keys(this.tipoPagamentoEnum)
  }

  tipoPagamento(evento) {
    this.tipo = evento
    this.tipo === "E" ? this.isTroco = true : this.isTroco = false;
  }

  pagamentoSubmit() {

    if (this.tipo) {
      this.pagamento.tipo = this.tipo
      this.pagamento.troco = this.pagamentoForm.controls['troco'].value
      this.infoTipoPagamento.emit(this.pagamento);
    }

  }

}
