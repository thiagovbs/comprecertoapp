import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagamentoEnum } from '../../../models/pagamento-enum.model';


@Component({
  selector: 'wizard-tipo-pagamento',
  templateUrl: 'wizard-tipo-pagamento.html'
})
export class WizardTipoPagamentoComponent {


  @Output() infoTipoPagamento = new EventEmitter();

  @Input() valorTotalPedido: number;
  @Input() valorFrete: number;
  @Input() valorMimimoFrete: number;

  pagamentoForm: FormGroup
  tipo: any
  tipoPagamentoEnum = PagamentoEnum
  isTroco: boolean = false;
  pagamento: { tipo: string, troco: number } = { tipo: undefined, troco: 0 }
  stepCondition: any
  constructor(private formBuilder: FormBuilder) {

    this.pagamentoForm = this.formBuilder.group({
      troco: this.formBuilder.control({ value: 0 })
    })
  }

  ionViewDidLoad() {

  }

  getTipoPagamentoEnum() {
    return Object.keys(this.tipoPagamentoEnum)
  }

  tipoPagamento(evento) {
    evento === "E" ? this.isTroco = true : this.isTroco = false;
    this.pagamento.tipo = evento
    this.infoTipoPagamento.emit(this.pagamento);
  }


  getTroco(){
    this.pagamento.troco = this.pagamentoForm.controls['troco'].value
    this.infoTipoPagamento.emit(this.pagamento);
  }



}

