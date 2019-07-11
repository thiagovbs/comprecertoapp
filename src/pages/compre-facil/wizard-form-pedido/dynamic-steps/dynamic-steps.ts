import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SacolaMercados } from '../../../../models/SacolaMercados.model';
import { PedidoProduto } from '../../../../models/pedidoProduto.model';
import { Pedido } from '../../../../models/pedido.model';
import { MercadoLocalidade } from '../../../../models/mercadoLocalidade.model';
import { Produto } from '../../../../models/Produto.model';
import { CompraFacilService } from '../../../../services/compra-facil.service';
import { Usuario } from '../../../../models/usuario';
import { UsuarioService } from '../../../../services/usuario.service';


@IonicPage()
@Component({
  selector: 'page-dynamic-steps',
  templateUrl: 'dynamic-steps.html',
})
export class DynamicStepsPage {
  step: any;
  stepCondition: any;
  stepDefaultCondition: any;
  currentStep: any;
  stepsArray: Array<Object> = [];
  stepsQuantidadeA: Array<any> = [0, 0, 0];
  pedidoForm: FormGroup;
  pedidosMercado: SacolaMercados;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public evts: Events,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    private compraFacilService:CompraFacilService,
    private userService:UsuarioService) {

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

    this.step = 1;//The value of the first step, always 1
    this.stepCondition = false;//For each step the condition is set to this value, Set to true if you don't need condition in every step
    this.stepDefaultCondition = this.stepCondition;//Save the default condition for each step

    //You can subscribe to the Event 'step:changed' to handle the current step
    this.evts.subscribe('step:changed', step => {
      //Handle the current step if you need
      this.currentStep = step;
      //Set the step condition to the default value
      this.stepCondition = this.stepDefaultCondition;
    });
    this.evts.subscribe('step:next', () => {
      //Do something if next
      console.log('Next pressed: ', this.currentStep);
    });
    this.evts.subscribe('step:back', () => {
      //Do something if back
      console.log('Back pressed: ', this.currentStep);
    });
  }

  onFinish() {
    this.alertCtrl.create({
      message: 'Wizard Finished!!',
      title: 'Congrats!!',
      buttons: [{
        text: 'Ok'
      }]
    }).present();
  }

  toggleCondition(_condition) {
    this.stepCondition = _condition.checked;
  }

  ionViewDidLoad() {
    this.pedidosMercado = this.navParams.get('pedido');
    this.userService.getLocalUser()
    
  }

  SubmitForm() {
    let celularForm = this.pedidoForm.get('celular').value
    let nomeForm = this.pedidoForm.get('nome').value
    let cpf = this.pedidoForm.get('cpf').value
    let endereco = this.pedidoForm.get('endereco').value
    let numero = this.pedidoForm.get('numero').value
    let complemento = this.pedidoForm.get('complemento').value
    let bairro = this.pedidoForm.get('bairro').value
    let cidade = this.pedidoForm.get('cidade').value
    let estado = this.pedidoForm.get('cidade').value


    let pedido: Pedido = {} as Pedido;
    pedido.pedidoProdutos = [];
    pedido.celular = celularForm;
    pedido.endereco = endereco;
    pedido.entrega = "E";
    pedido.pagamento = "D";
    pedido.valorFrete = 0;
    pedido.troco = 0;
    pedido.telefone = "(21)2208-7717";
    pedido.status = "A";
    pedido.usuario = this.userService.getLocalUser()


    let mercadoLocalidade: MercadoLocalidade = {} as MercadoLocalidade;
    mercadoLocalidade.idMercadoLocalidade = this.pedidosMercado.sacolaMercado.idMercadoLocalidade
    mercadoLocalidade.fAtivo = true;
    pedido.mercadoLocalidade = mercadoLocalidade

    for (let carrinhoItem of this.pedidosMercado.carrinhoItem) {
      let pedidoProduto: PedidoProduto = {} as PedidoProduto;
      let produto: Produto = {} as Produto;
      produto.idProduto = carrinhoItem.produto.idProduto;
      pedidoProduto.produto = produto;
      pedidoProduto.quantidade = carrinhoItem.quantidade;
      pedidoProduto.preco = 10;
      pedido.pedidoProdutos.push(pedidoProduto);
    }
    this.compraFacilService.postPedido(pedido).subscribe(resp=>{
      console.log(resp)
    },erro=>{
      console.log(erro)
    })
    console.log(pedido)
  }
}
