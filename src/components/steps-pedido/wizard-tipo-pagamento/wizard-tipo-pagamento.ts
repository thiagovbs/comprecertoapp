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
  trocoList: Array<number> = []
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
    let valorTotal: number = this.valorTotalPedido

    this.montarTroco(valorTotal)
  }

  montarTroco(total: number) {

    this.trocoList = [];

    let totalSemDecimal = Math.trunc(total + 5);
    totalSemDecimal = Math.round(totalSemDecimal / 10) * 10
    
    this.trocoList.push(totalSemDecimal);
    
      let i = 10;
      if(totalSemDecimal < 50){
        this.trocoList.push(50);
        this.trocoList.push(100);
      }
      if(totalSemDecimal >= 50 && totalSemDecimal <100){
        this.trocoList.push(100);
      }
      
      do {
        this.trocoList.push(i + totalSemDecimal);

        this.trocoList = this.trocoList.filter((el, i, a) => i === a.indexOf(el));
        
        if (this.trocoList[this.trocoList.length - 1] > totalSemDecimal + 50) {
          return;
        }
        i = i + 5;
        this.trocoList.sort((n1,n2) => n1 - n2)

      }
      while (totalSemDecimal < this.trocoList[this.trocoList.length - 1]);

  }


  getTroco() {
    this.pagamento.troco = this.pagamentoForm.controls['troco'].value
    this.infoTipoPagamento.emit(this.pagamento);
  }

  setTroco(valor) {
    return "R$ " + valor + "," + "00";
  }

}

