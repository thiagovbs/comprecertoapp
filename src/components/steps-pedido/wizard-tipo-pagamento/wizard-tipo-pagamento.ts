import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  stepCondition: any;
  trocoList:Array<number> =[]
  constructor(private formBuilder: FormBuilder) {

    this.pagamentoForm = this.formBuilder.group({
      troco: this.formBuilder.control({ value: 0 })
    })
    this.trocoList = [];
    this.trocoList.push(10);
    this.trocoList.push(20);
    this.trocoList.push(30);
    this.trocoList.push(40);
    this.trocoList.push(50);
    this.trocoList.push(60);
    this.trocoList.push(70);
    this.trocoList.push(80);
    this.trocoList.push(90);
    this.trocoList.push(100);
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
    console.log(this.pagamento.troco)
    this.infoTipoPagamento.emit(this.pagamento);
  }

  setTroco(valor){
    return "R$ " + valor + "," + "00"; 
  }

}

