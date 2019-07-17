import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, ViewController } from 'ionic-angular';

import { SacolaMercados } from '../../../../models/SacolaMercados.model';

import { UsuarioService } from '../../../../services/usuario.service';
import { Pedido } from '../../../../models/pedido.model';
import { MercadoLocalidade } from '../../../../models/mercadoLocalidade.model';
import { PedidoProduto } from '../../../../models/pedidoProduto.model';
import { Produto } from '../../../../models/Produto.model';
import { CompraFacilService } from '../../../../services/compra-facil.service';


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
  valorFrete:number
  valorMimimoFrete:number

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public evts: Events,
    public navParams: NavParams,
    private userService: UsuarioService,
    public viewCtrl: ViewController,
    private compraFacilService: CompraFacilService) {

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
    this.montarPedido()
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
    this.valorFrete = this.pedidosMercado.sacolaMercado.valorFrete
    this.valorMimimoFrete = this.pedidosMercado.sacolaMercado.valorMinimo

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




  montarPedido() {

    let pedido: Pedido = {} as Pedido;
    pedido.usuario = this.userService.getLocalUser()
    pedido.usuario.permissoes = []
    pedido.pedidoProdutos = [];

    pedido.celular = '2222222';
    
    if(this.enderecoPedido){
      pedido.entrega = "E";
      pedido.endereco = this.enderecoPedido.endereco+ this.enderecoPedido.complemento + this.enderecoPedido.bairro + this.enderecoPedido.cidade + this.enderecoPedido.estado;
    }else{
      /////////////////////////////
      pedido.endereco=" foda-se";
      ////////////////////////////////
      pedido.entrega = "R";
      pedido.dataHoraRetirada = this.dataHoraPedidoRetirada
    }
    
    pedido.pagamento = this.pagamento.tipo;
    pedido.valorFrete = 0;
    pedido.troco = this.pagamento.troco;
    pedido.status = "L";


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
  } 
  
}
