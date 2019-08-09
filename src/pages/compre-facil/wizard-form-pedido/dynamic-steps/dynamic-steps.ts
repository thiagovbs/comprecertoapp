import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, ViewController, App } from 'ionic-angular';

import { SacolaMercados } from '../../../../models/SacolaMercados.model';

import { UsuarioService } from '../../../../services/usuario.service';
import { Pedido } from '../../../../models/pedido.model';
import { MercadoLocalidade } from '../../../../models/mercadoLocalidade.model';
import { PedidoProduto } from '../../../../models/pedidoProduto.model';
import { Produto } from '../../../../models/Produto.model';
import { CompraFacilService } from '../../../../services/compra-facil.service';
import { CarrinhoService } from '../../../../services/carrinho.service';


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
  pedidosMercado: SacolaMercados = {} as SacolaMercados;
  enderecoPedido: any = {} as any;
  dataHoraPedidoRetirada: any
  pagamento: any;
  valorTotal: number
  valorFrete: number
  valorMimimoFrete: number
  infoMercado: any;
  isLastStep: boolean = false
  produtosPedido: any
  celularRetirada:any

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public evts: Events,
    public navParams: NavParams,
    private userService: UsuarioService,
    public viewCtrl: ViewController,
    private compraFacilService: CompraFacilService,
    private alertCrtl: AlertController,
    private carrinhoService:CarrinhoService,
    private app:App) {

    this.step = 1;//The value of the first step, always 1
    this.stepCondition = false;//For each step the condition is set to this value, Set to true if you don't need condition in every step
    this.stepDefaultCondition = this.stepCondition;//Save the default condition for each step

    this.evts.subscribe('step:changed', step => {
      this.currentStep = step;
      this.stepCondition = false;

      //Verifica se os atributos estão preenchidos e se o usuário estiver ido até o último passo
      if ((this.enderecoPedido || this.dataHoraPedidoRetirada) && this.isLastStep) {
        this.stepCondition = true;
      }

      //Se estiver na Finalização, deixa a condição verdadeira
      if (this.currentStep === 4) {
        this.stepCondition = true;
        this.isLastStep = true;
      } else {
        this.isLastStep = false;
      }
    });

    this.evts.subscribe('step:back', () => {
      this.stepCondition = true;
    });

    this.pedidosMercado = this.navParams.get('pedido');
    this.valorTotal = this.navParams.get('valorTotal');
    this.userService.getLocalUser();
    this.valorFrete = this.pedidosMercado.sacolaMercado.valorFrete
    this.valorMimimoFrete = this.pedidosMercado.sacolaMercado.valorMinimo
    this.produtosPedido = this.pedidosMercado.carrinhoItem;
    this.infoMercado = this.pedidosMercado.sacolaMercado
    

  }


  onFinish() {
    this.montarPedido()
  }

  toggleCondition(_condition) {
    this.stepCondition = _condition.checked;
  }

  onClose() {
    const prompt = this.alertCtrl.create({
      title: 'Deseja cancelar sua compra?',
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
      this.stepCondition = true;
      this.enderecoPedido = evento;
      this.celularRetirada = evento.celular
      this.compraFacilService.setEnderecoPedidoUsuario(this.enderecoPedido)
      this.compraFacilService.setEntregaOuRetirada('E');
    } else {
      this.enderecoPedido = undefined;
      this.stepCondition = false
      
    }
  }

  aoMudarTipoDataHora(evento) {
    if (evento) {
      console.log(evento)
      this.stepCondition = true;
      this.dataHoraPedidoRetirada = evento.dataHora
      this.compraFacilService.setDataRetiradaPedidoUsuario(this.dataHoraPedidoRetirada)
      this.celularRetirada = evento.celular
      this.currentStep = 3
      this.compraFacilService.setEntregaOuRetirada('R');
      
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
      this.compraFacilService.setPagamento(evento)
    } else {
      this.stepCondition = false;
    }
  }

  montarPedido() {

    let pedido: Pedido = {} as Pedido;
    pedido.usuario = this.userService.getLocalUser()
    pedido.usuario.permissoes = []
    pedido.pedidoProdutos = [];
     console.log(this.enderecoPedido.celular) 
    pedido.celular = this.enderecoPedido.celular;
    pedido.substituicao= this.substituicao;
    if (this.enderecoPedido.endereco) {
      pedido.entrega = "E";
      pedido.endereco = this.enderecoPedido.endereco + " " +this.enderecoPedido.complemento + " " + this.enderecoPedido.bairro + " " + this.enderecoPedido.cidade + " " + this.enderecoPedido.estado;
      pedido.valorFrete = 0;      
    } else {
      pedido.celular = this.celularRetirada    
      pedido.entrega = "R";
      pedido.dataHoraRetirada = this.dataHoraPedidoRetirada
    }

    pedido.pagamento = this.pagamento.tipo;
    pedido.troco = this.pagamento.troco;
    pedido.status = "L";


    let mercadoLocalidade: MercadoLocalidade = {} as MercadoLocalidade;
    mercadoLocalidade.idMercadoLocalidade = this.pedidosMercado.sacolaMercado.idMercadoLocalidade
    mercadoLocalidade.imagemUrl= this.pedidosMercado.sacolaMercado.imagemMercado;
    mercadoLocalidade.fAtivo = true;
    pedido.mercadoLocalidade = mercadoLocalidade;

    console.log(this.pedidosMercado)
    

    for (let carrinhoItem of this.pedidosMercado.carrinhoItem) {
      let pedidoProduto: PedidoProduto = {} as PedidoProduto;
      let produto: Produto = {} as Produto;
      produto.idProduto = carrinhoItem.produto.idProduto;
      pedidoProduto.produto = produto;
      pedidoProduto.quantidade = carrinhoItem.quantidade;
      pedidoProduto.preco = carrinhoItem.produto.precoMercadoProduto;
      pedido.pedidoProdutos.push(pedidoProduto);
    }
    console.log(pedido)
    this.compraFacilService.postPedido(pedido).subscribe(resp => {
      this.carrinhoService.changeMercadoSacolaToCarrinhoItem(this.pedidosMercado)
      this.successAlert()
      this.viewCtrl.dismiss();
      this.app.getRootNav().setRoot("HistoricoPedidosPage");
    }, erro => {
      this.myAlert() 
      console.log(erro)
    });
  }


  myAlert() {
    let alert = this.alertCrtl.create({
      title: '<img src="assets/imgs/icone-de-erro.svg" height="100">',
      message: 'Sua compra não foi finalizada, Tente novamente!',
      enableBackdropDismiss: false,
      cssClass: 'AlertCompraFacil',
      buttons: [
        { text: 'Ok' }
      ]
    })
    alert.present()
  }

  successAlert(){
    this.alertCtrl.create({
      message: 'Seu pedido foi finalizado!!',
      title: 'Parabéns!!',
      cssClass: 'AlertCompraFacil',
      buttons: [{
        text: 'Ok'
      }]
    },).present();
  }

}
