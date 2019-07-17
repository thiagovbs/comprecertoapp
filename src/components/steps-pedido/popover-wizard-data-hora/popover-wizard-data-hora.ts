import { Component, Output, EventEmitter } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'popover-wizard-data-hora',
  templateUrl: 'popover-wizard-data-hora.html'
})
export class PopoverWizardDataHoraComponent {

  dataHoraform: FormGroup

  datas: Date[] = []
  @Output() infoDataHoraPedido = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private viewControl: ViewController) {

    this.getDataHoraRetirada()
    this.dataHoraform = this.formBuilder.group({
      dataHora: this.formBuilder.control('', [Validators.required]),
    })

  }

  btnSalvarDataHora() {
    this.viewControl.dismiss('valor')
  }

  getDataHoraRetirada() {
    this.datas = [];
    ////////////////////////////////
    let horarioMax: String = String('23:30:00');
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
    this.viewControl.dismiss(this.dataHoraform.value)

  }
}
