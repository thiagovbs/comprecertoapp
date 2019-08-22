import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Pedido } from '../../models/pedido.model';
import { PedidosService } from '../../services/pedidos.service';
import { AlcanceService } from '../../services/alcance.service';
import { CallNumber } from '@ionic-native/call-number';


@IonicPage()
@Component({
  selector: 'page-historico-pedidos',
  templateUrl: 'historico-pedidos.html',
})
export class HistoricoPedidosPage {

  activeEntrega: boolean = false
  endereco: string;
  numero: string;
  complemento: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private pedidosService: PedidosService,
    private alcanceService: AlcanceService,
    private callNumber: CallNumber,
    private alertCrtl: AlertController,
    private loadingCtrl: LoadingController) {
  }
  pedidos: Pedido[] = [];

  ionViewDidLoad() {
    this.getPedidosHistorico()
    this.setTimePedido()

    if (this.alcanceService.getLocalEndereco() !== null) {
      this.endereco = this.alcanceService.getLocalEndereco().endereco;
      this.numero = this.alcanceService.getLocalEndereco().numero;
      this.complemento = this.alcanceService.getLocalEndereco().complemento;
    }
  }

  onCompraFacil() {
    this.navCtrl.push('CompreFacilPage', {})
  }

  setProgress() {
    this.activeEntrega = true
  }

  setTimePedido() {
    setInterval(() => {
      this.getPedidosHistorico();
    }, 60000)
  }

  setQtdPedido(pedido: Pedido): number {
    let total = 0;
    pedido.pedidoProdutos.map(produto => {
      total = produto.quantidade + total
    })
    return total
  }

  getPedidosHistorico() {
    let loader = this.presenteLoading();
    this.pedidosService.getPedidos().subscribe(resp => {
      loader.dismiss();
      console.log(resp)
      this.pedidos = resp;
    }, erro => {
      loader.dismiss();
      console.log(erro)
    })
  }

  setValorTotalPedido(pedido: Pedido): number {
    let total = 0;
    pedido.pedidoProdutos.map(produto => {
      total = produto.preco * produto.quantidade + total
    })
    return total;
  }


  onSearch() {
    this.navCtrl.push('PesquisaPage')
  }

  onSuporte(pedido) {

    this.callNumber.callNumber(pedido.mercadoLocalidade.telefone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  onSaibaMais() {
    this.myAlert()
  }

  myAlert() {
    let alert = this.alertCrtl.create({
      title: '<img src="assets/imgs/icone-de-erro.svg" height="60">',
      message: `O mercado não deve conseguir entregar no endereço solicitado. 
      Ligue para o mercado em <b>suporte</b> e saiba mais.`,
      enableBackdropDismiss: false,
      cssClass: 'AlertCompraFacil',
      buttons: [
        { text: 'Ok' }
      ]
    })
    alert.present()
  }

  presenteLoading(): Loading {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      //content: `<img src="assets/imgs/loading3.gif" height="50px" />`,
      duration: 50000,
      cssClass: 'my-loading-class'
    });
    loading.present();
    return loading
  }



}
