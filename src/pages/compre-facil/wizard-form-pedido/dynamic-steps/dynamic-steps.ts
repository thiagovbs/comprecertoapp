import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, ViewController } from 'ionic-angular';

import { SacolaMercados } from '../../../../models/SacolaMercados.model';

import { UsuarioService } from '../../../../services/usuario.service';


@IonicPage()
@Component({
  selector: 'page-dynamic-steps',
  templateUrl: 'dynamic-steps.html',
})
export class DynamicStepsPage {
  step: any;
  substituicao: any;
  stepCondition: boolean = false;
  stepDefaultCondition: boolean;
  currentStep: any;
  pedidosMercado: SacolaMercados;
  enderecoPedido: any;
  dataHoraPedidoRetirada: any
  pagamento: any;
  valorTotal:number

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public evts: Events,
    public navParams: NavParams,
    private userService: UsuarioService,
    public viewCtrl: ViewController) {

    this.step = 1;//The value of the first step, always 1
    this.stepCondition = false;//For each step the condition is set to this value, Set to true if you don't need condition in every step
    this.stepDefaultCondition = this.stepCondition;//Save the default condition for each step

    this.evts.subscribe('step:changed', step => {
      this.currentStep = step;
      console.log(step)
      //this.stepCondition = false;
      if(step === 3){
        this.stepCondition = true;
      }
    });
  }

  onFinish() {

    if (this.dataHoraPedidoRetirada) {

    } else {

    }

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
    this.valorTotal = this.navParams.get('valorTotal');
    this.userService.getLocalUser();

    console.log(this.pedidosMercado)
    console.log(this.valorTotal)
  }

  onClose() {
    const prompt = this.alertCtrl.create({
      title: 'Deseja cancelar sua compra ?',
      message: "Você perderá as informações preenchidas nesse formulário",
      cssClass: 'ConfirmCompraFacil',
      buttons: [
        {
          text: 'Sair',
          handler: data => {
            console.log('Cancelado');
            this.viewCtrl.dismiss()
          }
        },
        {
          text: 'Continuar',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  //evento recebe o valor da substituicao
  aoSubstituir(evento) {
    this.stepCondition = true
    this.substituicao = evento
    this.currentStep = 2
  }

  aoMudarTipoRetiradaPedido(evento) {
    if (evento) {
      this.stepCondition = true
      this.enderecoPedido = evento
      this.currentStep = 3
    } else {
      this.enderecoPedido = undefined;
      this.stepCondition = false
    }
  }

  aoMudarTipoDataHora(evento) {
    if (evento) {
      this.stepCondition = true;
      this.dataHoraPedidoRetirada = evento
      this.currentStep = 3
    } else {
      this.dataHoraPedidoRetirada = undefined
      this.stepCondition = false;
    }
  }

  aoMudarTipoPagamento(evento: any) {

    if (evento.tipo) {
      this.pagamento = evento;
      this.stepCondition = true;
      this.currentStep = 4
    } else {
      this.stepCondition = false;
    }
  }




  SubmitForm() {


    /* let celularForm = this.pedidoForm.get('celular').value
    let nomeForm = this.pedidoForm.get('nome').value
    let cpf = this.pedidoForm.get('cpf').value
    let endereco = this.pedidoForm.get('endereco').value
    let numero = this.pedidoForm.get('numero').value
    let complemento = this.pedidoForm.get('complemento').value
    let bairro = this.pedidoForm.get('bairro').value
    let cidade = this.pedidoForm.get('cidade').value
    let estado = this.pedidoForm.get('cidade').value


    let pedido: Pedido = {} as Pedido;
    pedido.usuario = this.userService.getLocalUser()
    pedido.usuario.permissoes = []
    pedido.pedidoProdutos = [];
    pedido.celular = celularForm;
    pedido.endereco = endereco;
    pedido.entrega = "E";
    pedido.pagamento = "D";
    pedido.valorFrete = 0;
    pedido.troco = 0;
    pedido.status = "A";


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
    console.log(pedido)
    this.compraFacilService.postPedido(pedido).subscribe(resp => {
      console.log(resp)
    }, erro => {
      console.log(erro)
    })
  } */
  }
}
