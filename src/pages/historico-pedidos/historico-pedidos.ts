import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pedido } from '../../models/pedido.model';
import { PedidosService } from '../../services/pedidos.service';
import { AlcanceService } from '../../services/alcance.service';


@IonicPage()
@Component({
  selector: 'page-historico-pedidos',
  templateUrl: 'historico-pedidos.html',
})
export class HistoricoPedidosPage {

  activeEntrega: boolean = false
  endereco:string;
  numero:string;
  complemento:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private pedidosService: PedidosService,
    private alcanceService:AlcanceService) {
  }
  pedidos: Pedido[] = [];

  ionViewDidLoad() {
    this.getPedidosHistorico()
    this.setTimePedido()

    this.endereco = this.alcanceService.getLocalEndereco().endereco;
    this.numero = this.alcanceService.getLocalEndereco().numero;
    this.complemento = this.alcanceService.getLocalEndereco().complemento;

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
    this.pedidosService.getPedidos().subscribe(resp => {
      this.pedidos = resp;
    }, erro => {
      console.log(erro)
    })
  }

  setValorTotalPedido(pedido:Pedido):number{
    let total = 0;
    pedido.pedidoProdutos.map(produto => {
      total = produto.preco * produto.quantidade + total
    })
    return total;
  }

}
