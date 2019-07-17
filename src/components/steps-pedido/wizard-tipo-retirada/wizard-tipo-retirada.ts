import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams, PopoverController, ViewController, Events } from 'ionic-angular';
import { SacolaMercados } from '../../../models/SacolaMercados.model';
import { FormCompraFacilPopoverComponent } from '../form-compra-facil-popover/form-compra-facil-popover';
import { PopoverWizardDataHoraComponent } from '../popover-wizard-data-hora/popover-wizard-data-hora';

@Component({
  selector: 'wizard-tipo-retirada',
  templateUrl: 'wizard-tipo-retirada.html'
})
export class WizardTipoRetiradaComponent {


  pedidoForm: FormGroup;
  @Output() infoTipoRetiradaPedido = new EventEmitter();
  @Output() infoDataHoraPedido = new EventEmitter();
  @Input() pedidosMercado: SacolaMercados;
  step:number = 2;
  currentStep: any;
  stepCondition:boolean;
  
  constructor(private formBuilder: FormBuilder,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public viewCtrl: ViewController,
    public events: Events) {

    this.pedidoForm = this.formBuilder.group({
      celular: this.formBuilder.control('', [Validators.required]),
      cpf: this.formBuilder.control('', [Validators.required]),
      nome: this.formBuilder.control('', [Validators.required]),
      endereco: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      numero: this.formBuilder.control('', [Validators.required]),
      complemento: this.formBuilder.control('', [Validators.required]),
      bairro: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      cidade: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      estado: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
    })
  }

  ionViewDidLoad() {
    console.log("tipo retirada")
    this.stepCondition = false
  }

  //popover para mostrar o form para o cliente adicionar seu endereco que irá receber em casa
  showFormCompraFacil(ev) {
    
    let popover = this.popoverCtrl.create(FormCompraFacilPopoverComponent, {
      pedidosMercado: this.pedidosMercado
    }, { cssClass: 'form-compra-facil' });
    popover.present();
    popover.onDidDismiss(data => {
      this.infoTipoRetiradaPedido.emit(data);
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

    });
  }

}