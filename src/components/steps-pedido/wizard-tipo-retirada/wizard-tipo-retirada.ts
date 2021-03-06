import { Component, Output, EventEmitter, Input } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { NavParams, PopoverController, ViewController, Events } from 'ionic-angular';
import { SacolaMercados } from '../../../models/SacolaMercados.model';
import { FormCompraFacilPopoverComponent } from '../form-compra-facil-popover/form-compra-facil-popover';
import { PopoverWizardDataHoraComponent } from '../popover-wizard-data-hora/popover-wizard-data-hora';

@Component({
  selector: 'wizard-tipo-retirada',
  templateUrl: 'wizard-tipo-retirada.html'
})
export class WizardTipoRetiradaComponent {

  @Output() infoTipoRetiradaPedido = new EventEmitter();
  @Output() infoDataHoraPedido = new EventEmitter();
  @Input() pedidosMercado: SacolaMercados;
  @Input() infoMercado: any
  

  pedidoForm: FormGroup;
  step: number = 2;
  currentStep: any;
  stepCondition: boolean;
  isEnderecoCompleto: boolean = false;
  isDataHorarioPedido: boolean = false;

  constructor(public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public viewCtrl: ViewController,
    public events: Events) {

  }

  ionViewDidLoad() {
  }

  //popover para mostrar o form para o cliente adicionar seu endereco que irá receber em casa
  showFormCompraFacil(ev) {

    let popover = this.popoverCtrl.create(FormCompraFacilPopoverComponent, {
      pedidosMercado: this.pedidosMercado
    }, { cssClass: 'form-compra-facil' });
    popover.present();
    popover.onDidDismiss(data => {
      this.infoTipoRetiradaPedido.emit(data);
      data ? this.isEnderecoCompleto = true : this.isEnderecoCompleto = false;
      this.isDataHorarioPedido = false
      console.log(data);
    });
  }

  //popover para mostrar o form de datas que o mercado pode entregar
  showFormdataHora(ev) {

    let popover = this.popoverCtrl.create(PopoverWizardDataHoraComponent, {
      pedidosMercado: this.pedidosMercado
    }, { cssClass: 'form-compra-facil' });
    popover.present();
    popover.onDidDismiss(data => {
      this.infoDataHoraPedido.emit(data);
      data ? this.isDataHorarioPedido = true : this.isDataHorarioPedido = false;
      this.isEnderecoCompleto = false;
    });
  }

}