import { Component, Output, EventEmitter } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Time } from '@angular/common';
import { SacolaMercados } from '../../../models/SacolaMercados.model';
import { AlcanceService } from '../../../services/alcance.service';
import { EnderecoLocalStorage } from '../../../models/endereco-localstorage';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'popover-wizard-data-hora',
  templateUrl: 'popover-wizard-data-hora.html'
})
export class PopoverWizardDataHoraComponent {

  dataHoraform: FormGroup
  pedidoMercado: SacolaMercados = {} as SacolaMercados
  datas: Date[] = []
  usuarioCPF:any;

  @Output() infoDataHoraPedido = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private viewControl: ViewController,
    private navParams: NavParams,
    private localAlcance: AlcanceService,
    private localUser: UsuarioService) {


    this.dataHoraform = this.formBuilder.group({
      dataHora: this.formBuilder.control('', [Validators.required]),
      cpf: this.formBuilder.control({ value: this.usuarioCPF, disabled: true }, [Validators.required]),
      celular: this.formBuilder.control('', [Validators.required, Validators.minLength(14)]),
    })


  }

  ionViewDidLoad() {
    this.usuarioCPF = this.localUser.getLocalUser().cpf;
    this.pedidoMercado = this.navParams.get('pedidosMercado');
    if (this.localAlcance.getLocalEndereco()) {
      this.dataHoraform.get('celular').setValue(this.localAlcance.getLocalEndereco().celular);
    }


    this.localAlcance.getLocalEndereco()
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
    let celular = this.dataHoraform.controls['celular'].value;

    if (this.localAlcance.getLocalEndereco()){
      let localEndereco: EnderecoLocalStorage = {
        endereco: this.localAlcance.getLocalEndereco().endereco,
        numero: this.localAlcance.getLocalEndereco().numero,
        complemento: this.localAlcance.getLocalEndereco().complemento,
        celular: celular,
      };
      this.localAlcance.setLocalEndereco(localEndereco);
    } else {
      let localEndereco: EnderecoLocalStorage = { endereco: "", numero: "", complemento: "", celular: celular };
      this.localAlcance.setLocalEndereco(localEndereco);
    }

    this.viewControl.dismiss(this.dataHoraform.value)

  }
}
