import { Component, Output, EventEmitter } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Time } from '@angular/common';
import { SacolaMercados } from '../../../models/SacolaMercados.model';
import { AlcanceService } from '../../../services/alcance.service';

@Component({
  selector: 'popover-wizard-data-hora',
  templateUrl: 'popover-wizard-data-hora.html'
})
export class PopoverWizardDataHoraComponent {

  dataHoraform: FormGroup
  pedidoMercado: SacolaMercados={} as SacolaMercados
  datas: Date[] = []

  @Output() infoDataHoraPedido = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private viewControl: ViewController,
    private navParams: NavParams,
    private localAlcance:AlcanceService) {

    
    this.dataHoraform = this.formBuilder.group({
      dataHora: this.formBuilder.control('', [Validators.required]),
      cpf:this.formBuilder.control({value:'139.791.307-03', disabled:true}, [Validators.required]),
      celular:  this.formBuilder.control('', [Validators.required, Validators.minLength(14)]),
    })

   
  }

  ionViewDidLoad() {
    this.pedidoMercado = this.navParams.get('pedidosMercado');
    console.log(this.pedidoMercado)
    this.getDataHoraRetirada()
  }

  btnSalvarDataHora() {
    this.viewControl.dismiss('valor')
  }

  getDataHoraRetirada() {
    this.datas = [];
    ////////////////////////////////
    
    let horarioMax: String = String(this.pedidoMercado.sacolaMercado.horarioMaximo);
    let hour = (horarioMax.split(':'))[0]
    let min = (horarioMax.split(':'))[1]

    let dataLimite = new Date()
    dataLimite.setHours(Number(hour))
    dataLimite.setMinutes(Number(min))
    dataLimite.setSeconds(0)

    let dataAtual = new Date();

    if (dataAtual.getMinutes() >= 0 && dataAtual.getSeconds() >= 0) {
      dataAtual.setHours(dataAtual.getHours() + 1);
      dataAtual.setMinutes(0);
      dataAtual.setSeconds(0);
    }

    if (dataAtual <= dataLimite) {
      let dataTmp = dataAtual;
      while (dataTmp <= dataLimite) {
        this.datas.push(new Date(dataTmp))
        dataTmp.setHours(dataTmp.getHours() + 1);
      }

      let novaData = new Date();
      if (novaData.getDate() === dataAtual.getDate()) {
        dataAtual.setDate(dataAtual.getDate() + 1)
      }
      dataAtual.setHours(9)
      dataLimite.setDate(dataLimite.getDate() + 1)

      while (dataTmp <= dataLimite) {
        this.datas.push(new Date(dataTmp));

        dataTmp.setHours(dataTmp.getHours() + 1);
      }
    }
    if (dataAtual >= dataLimite) {
      let novaData = new Date();

      if (novaData.getDate() === dataAtual.getDate()) {
        dataAtual.setDate(dataAtual.getDate() + 1)
      }

      dataAtual.setHours(9)
      dataLimite.setDate(dataLimite.getDate() + 1)

      let dataTmp = dataAtual;
      
      while (dataTmp <= dataLimite) {
        this.datas.push(new Date(dataTmp))
        dataTmp.setHours(dataTmp.getHours() + 1);
      }
    }
  }

  dataHoraSubmit() {
    console.log(this.dataHoraform.value)
    this.viewControl.dismiss(this.dataHoraform.value)

  }
}
